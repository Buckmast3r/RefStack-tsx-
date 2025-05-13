type LogLevel = 'info' | 'warn' | 'error' | 'debug'

interface LogMessage {
  level: LogLevel
  message: string
  timestamp: string
  data?: Record<string, unknown>
}

class Logger {
  private static instance: Logger
  private isDevelopment: boolean

  private constructor() {
    this.isDevelopment = process.env.NODE_ENV === 'development'
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger()
    }
    return Logger.instance
  }

  private formatMessage(level: LogLevel, message: string, data?: Record<string, unknown>): LogMessage {
    return {
      level,
      message,
      timestamp: new Date().toISOString(),
      data,
    }
  }

  private log(level: LogLevel, message: string, data?: Record<string, unknown>) {
    const logMessage = this.formatMessage(level, message, data)

    if (this.isDevelopment) {
      console.log(JSON.stringify(logMessage, null, 2))
    } else {
      // In production, you might want to send logs to a service like Sentry, LogRocket, etc.
      // For now, we'll just use console.log
      console.log(JSON.stringify(logMessage))
    }
  }

  public info(message: string, data?: Record<string, unknown>) {
    this.log('info', message, data)
  }

  public warn(message: string, data?: Record<string, unknown>) {
    this.log('warn', message, data)
  }

  public error(message: string, data?: Record<string, unknown>) {
    this.log('error', message, data)
  }

  public debug(message: string, data?: Record<string, unknown>) {
    if (this.isDevelopment) {
      this.log('debug', message, data)
    }
  }
}

export const logger = Logger.getInstance() 