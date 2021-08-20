import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { User } from '../../models/user';

const Router = express.Router();

Router.put('/api/user/:id', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
    
        if (!user) {
            throw new Error('No such user exists!');
        }
    
        const { userName, name, email, imageUrl, age } = req.body;
    
        user.set({
            userName, name, email, imageUrl, age
        });
    
        await user.save();
    
        res.status(204).send({
            message: 'user updated successfully',
            user,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as UserUpdateRouter };