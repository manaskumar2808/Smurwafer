import express, { Request, Response, NextFunction } from 'express';
import { Story } from '../../models/story';

const Router = express.Router();

Router.get('/api/story', async (req: Request, res: Response, next: NextFunction) => {
    // /api/story?page=1

    const page:number = parseInt(req.query.page as string);
    const perPage:number = 10;
    const offset:number = (page - 1) * perPage;

    const stories = await Story.find().skip(offset).limit(perPage);

    res.status(200).send({
        message: 'stories fetched successfully',
        stories,
    });
});

export { Router as StoryIndexRouter };