import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../../models/user';

const Router = express.Router();

Router.post('/api/auth/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
    
        const existingUser = await User.findOne({ email });
    
        if (!existingUser) {
            throw new Error("No such user exists!");
        }
    
        const isValid = await bcrypt.compare(password, existingUser.password);
    
        if (!isValid) {
            throw new Error("Password not valid!");
        }
    
        const token = jwt.sign({ email, id: existingUser.id }, 'secret', {
            expiresIn: '24h',
        });
    
        res.status(200).send({
            message: 'User logged in successfully',
            token,
            user: existingUser,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as LoginRouter };