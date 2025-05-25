import { PostFileType } from '../types/files';

const acceptableImageFileExts = ['png', 'jpeg', 'jpg', 'gif', 'webp'];

const acceptableVideoFileExts = ['mp4', 'webm', 'avi', 'mov', 'wmv'];

export function getFileType(filename: string): PostFileType {
  const ext = filename.split('.').pop();

  if (acceptableImageFileExts.includes(ext ?? '')) {
    return 'image';
  }

  if (acceptableVideoFileExts.includes(ext ?? '')) {
    return 'video';
  }

  throw new Error('Invalid file type');
}
