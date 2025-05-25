import { diskStorage, memoryStorage } from 'multer';
import { extname } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { environment } from '../environments/environment';

// Ensure uploads directory exists
const uploadsDir = 'uploads';
if (!existsSync(uploadsDir)) {
  mkdirSync(uploadsDir, { recursive: true });
}

export const storageConfig = {
  storage: environment.production
    ? memoryStorage()
    : diskStorage({
        destination: (req, file, callback) => {
          callback(null, uploadsDir);
        },
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
};
