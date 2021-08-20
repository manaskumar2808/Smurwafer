import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { Story } from '../../models/story';

const Router = express.Router();

Router.post('/api/story', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, text, gallery, hashtags } = req.body;
    
        const story = Story.build({
            title, text, gallery, hashtags, author: req.currentUser?.id as string,
        });
    
        await story.save();
    
        res.status(201).send({
            message: 'story created successfully',
            story,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as StoryCreateRouter };