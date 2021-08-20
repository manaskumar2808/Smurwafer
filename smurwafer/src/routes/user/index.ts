import express, { Request, Response, NextFunction } from 'express';
import { User } from '../../models/user';

const Router = express.Router();

Router.get('/api/user', async (req: Request, res: Response, next: NextFunction) => {
    const users = await User.find();

    res.status(200).send({
        message: 'users fetched successfully',
        users,
    });
});

export { Router as UserIndexRouter };