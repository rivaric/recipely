import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { BadRequestException } from '@nestjs/common';

export function ImageUpload() {
  return applyDecorators(
    UseInterceptors(
      FileInterceptor('image', {
        storage: diskStorage({
          destination: './static',
          filename: (req, file, cb) => {
            const host = req.get('host');
            const protocol = req.protocol;
            const ext = extname(file.originalname);
            const uniqueName = `${uuidv4()}${ext}`;

            const imageUrl = `${protocol}://${host}/static/${uniqueName}`;

            (req as any).imageUrl = imageUrl;
            cb(null, uniqueName);
          },
        }),
        fileFilter: (req, file, cb) => {
          const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
          const ext = extname(file.originalname).toLowerCase();
          if (allowedExtensions.includes(ext)) {
            cb(null, true);
          } else {
            cb(new BadRequestException('Only image files are allowed!'), false);
          }
        },
      }),
    ),
  );
}
