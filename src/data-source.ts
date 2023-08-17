import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { env } from './env'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: env.pg_db_host,
  port: env.pg_db_port,
  username: env.pg_db_username,
  password: env.pg_db_password,
  database: env.pg_db_name,
  synchronize: true,
  entities: [],
  subscribers: [],
  migrations: []
})
