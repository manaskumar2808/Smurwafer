import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { Gallery } from '../../models/gallery';
import { GalleryType } from '../../utility/gallery-type';

const Router = express.Router();

Router.post('/api/gallery', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { caption, type } = req.body;
    
        let modifiedType = GalleryType.Image;
        
        let imageUrl = "", videoUrl = "";
    
        if (type === 'video') {
            modifiedType = GalleryType.Video;
            if (req.files) {
                videoUrl = (req.files as Express.Multer.File[])[0].path as string;
            }
        } else {
            if (req.files) {
                imageUrl = (req.files as Express.Multer.File[])[0].path as string;
            }
        }
    
        const gallery = Gallery.build({
            imageUrl, videoUrl, caption, type: modifiedType,
        });
    
        gallery.save();
    
        res.status(201).send({
            message: 'gallery created successfully',
            gallery,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as GalleryCreateRouter };