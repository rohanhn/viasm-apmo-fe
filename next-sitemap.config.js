/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_APP_DOMAIN || 'https://localhost:3000',
  generateRobotsTxt: true,
};
