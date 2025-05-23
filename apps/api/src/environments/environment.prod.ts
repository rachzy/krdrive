export const environment = {
  production: true,
  mongodb: {
    uri: process.env.MONGODB_URI || '',
  },
};
