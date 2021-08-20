import express, { Request, Response, NextFunction } from 'express';
import { Story } from '../../models/story';

const Router = express.Router();

Router.get('/api/story', async (req: Request, res: Response, next: NextFunction) => {
    const stories = await Story.find();

    res.status(200).send({
        message: 'stories fetched successfully',
        stories,
    });
});

export { Router as StoryIndexRouter };