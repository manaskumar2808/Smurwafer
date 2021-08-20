import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../../models/user';
import { AuthValidator } from '../../validators/auth/auth-validator';
import { validateRequest } from '../../middlewares/validate-request';

const Router = express.Router();

Router.post('/api/auth/signup', AuthValidator, validateRequest, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userName, name, email, imageUrl, age, password } = req.body;

        const existingUser = await User.findOne({ email });
    
        if (existingUser) {
            throw new Error("Email address already exists!");
        }
    
        const passwordHash = await bcrypt.hash(password, 12);
    
        const user = User.build({
            userName, name, email, imageUrl, age, password: passwordHash,
        });
    
        user.save();
    
        const token = jwt.sign({ email, id: user.id }, 'secret', {
            expiresIn: '24h',
        });
    
        res.status(201).send({
            message: 'User signed up successfully',
            token,
            user,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as SignupRouter };