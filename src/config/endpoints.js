const process = require('process');

const DB_PASSWORD = process.env.DB_PASSWORD || 'root123456';
const DB_USERNAME = process.env.DB_USERNAME || 'root';

exports.DB_URL = `mongodb://${DB_USERNAME}:${DB_PASSWORD}@ds125372.mlab.com:25372/ykone-clients`;
exports.CLIENT_ENDPOINT = process.env.CLIENT_ENDPOINT || 'https://jointhecrew.in/clients/';
exports.CLIENT_RETRY_COUNT = process.env.CLIENT_RETRY_COUNT || 5;
exports.PORT = 3000;

// express routes
exports.EXPRESS_CLIENT_ENDPOINT = '/clients/';