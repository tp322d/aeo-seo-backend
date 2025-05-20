export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env('PUBLIC_URL', 'https://api.deeprank.ai'),
  app: {
    keys: env.array('APP_KEYS'),
  },
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET'),
    },
    autoOpen: false,
    watchIgnoreFiles: [
      '**/config/sync/**',
    ],
  },
  cors: {
    enabled: true,
    origin: ['https://deeprank.ai', 'https://www.deeprank.ai', 'http://localhost:3000'],
  },
});
