export default {
  database: process.env.MONGO_DB_NAME,
  user: process.env.MONGO_USER,
  password: process.env.MONGO_PASSWORD,
  host: process.env.MONGO_HOST,
  port: process.env.MONGO_PORT,
  atlasURI: process.env.MONGO_ATLAS_URI,
};
