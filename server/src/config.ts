import dotenv from "dotenv";

dotenv.config();
const env = {
  server_port: process.env.server_port || "8080",
  mongo_db: process.env.mongo_db,
  mongo_collection: process.env.mongo_collection,
};
export default env;
