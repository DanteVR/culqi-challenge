import dotenv from 'dotenv'
dotenv.config()

export const env = {
  pg_db_host: process.env.PG_DB_HOST,
  pg_db_port: Number(process.env.PG_DB_PORT),
  pg_db_username: process.env.PG_DB_USER,
  pg_db_password: process.env.PG_DB_PASS,
  pg_db_name: process.env.PG_DB_NAME,
  redis_db_host: String(process.env.REDIS_DB_HOST),
  redis_db_port: Number(process.env.REDIS_DB_PORT),
  redis_token_expiration: Number(process.env.REDIS_TOKEN_EXPIRATION)
}
