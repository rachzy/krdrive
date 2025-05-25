import { PostFileType } from '../types/files';

const acceptableVideoFileExts = ['mp4', 'webm', 'avi', 'mov', 'wmv'];

export function getFileType(filename: string): PostFileType {
  const ext = filename.split('.').pop();

  if (acceptableVideoFileExts.includes(ext ?? '')) {
    return 'video';
  }

  return 'image';
}
