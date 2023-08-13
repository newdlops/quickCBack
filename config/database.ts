import mongoose from 'mongoose'
import { logger } from './logger'

export default class Database {

  private databaseUrl = "mongodb://root:quickc@52.79.147.106:27017"
  public database: mongoose.Connection

  constructor() {
  }

  public async connectDB() {
    try {
      await mongoose.connect(this.databaseUrl, {dbName:'app'})
      this.database = mongoose.connection
      logger.info("mongodb connected")
    }
    catch(err) {
      logger.error("mongodb connection error", err)
    }
  }

  public async initDb() {
    await this.connectDB()
    this.database.on("error", function() {
      logger.error("mongoose connection error.")
    })
    this.database.on("disconnected", function () {
      logger.info("disconnected from database. try to connect again after 3s")
    })
  }

}