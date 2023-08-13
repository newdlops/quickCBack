import winston from 'winston'
import { Logform } from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'
import process from 'process'

class Logger {

  combine: (...opts: Logform.Format[]) => Logform.Format
  timestamp: (opts?: Logform.TimestampOptions) => Logform.Format
  label: (opts?: Logform.LabelOptions) => Logform.Format
  logFormat: Logform.Format
  logger: winston.Logger
  printf: (templateFunction: (info: Logform.TransformableInfo) => string) => Logform.Format
  private logDir = `${process.cwd()}/logs`

  private infoOption = {
    level: 'info',
    datePattern: 'YYYY-MM-DD',
    dirname: this.logDir,
    filename: `%DATE%.log`,
    maxFiles: 30,
    zippedArchive: true,
  }

  private errorOption = {
    level: 'error',
    datePattern: 'YYYY-MM-DD',
    dirname: this.logDir + '/error',
    filename: `%DATE%.log`,
    maxFiles: 30,
    zippedArchive: true,
  }

  private exceptionOption = {
    level: 'error',
    datePattern: 'YYYY-MM-DD',
    dirname: this.logDir,
    filename: `%DATE%.exception.log`,
    maxFiles: 30,
    zippedArchive: true,
  }

  constructor(){
    const { combine, printf, timestamp, label } = winston.format
    this.combine = combine
    this.timestamp = timestamp
    this.label = label
    this.printf = printf
  }

  init(){
    this.logFormat = this.printf(function({ level, message, label, timestamp }){
      return `${timestamp} [${label}] ${level}: ${message}`
    })

    this.logger = winston.createLogger({
      format: this.combine(
        this.timestamp({format:'YYYY-MM-DD HH:mm:ss'}),
        this.label({label:`QUICKC APP`}),
        this.logFormat,
      ),
      transports: [
        new DailyRotateFile(this.infoOption),
        new DailyRotateFile(this.errorOption),
      ],
      exceptionHandlers: [
        new DailyRotateFile(this.exceptionOption),
      ],
    })

    this.logger.add(
      new winston.transports.Console({
        format: this.combine(
          winston.format.colorize(),
          this.timestamp({format:'YYYY-MM-DD HH:mm:ss'}),
          this.label({label:`QUICKC APP`}),
          this.logFormat,
        ),
      }),
    )
    return this.logger
  }
}

export const logger = new Logger().init()