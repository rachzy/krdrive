import { Username } from '../types/users';

export function getProfilePictureByUsername(username: Username): string {
  if (username === 'kylo') {
    return '/assets/images/killua-pfp.jpg';
  }

  return '/assets/images/gojo-pfp.jpeg';
}
