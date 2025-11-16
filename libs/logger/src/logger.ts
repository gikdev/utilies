import { type LogLevel, logLevels } from "./log-levels"
import type { ILoggingProvider } from "./providers"

export interface LogOptions extends Record<string, unknown> {
  error?: Error
}

export interface ILogger {
  log(level: LogLevel, message: string, options?: LogOptions): void
  logTrace(message: string, options?: LogOptions): void
  logDebug(message: string, options?: LogOptions): void
  logInfo(message: string, options?: LogOptions): void
  logWarn(message: string, options?: LogOptions): void
  logError(message: string, options?: LogOptions): void
  logCritical(message: string, options?: LogOptions): void
}

export interface LoggerOptions {
  minLogLevel: LogLevel
  providers: ILoggingProvider[]
}

const defaultLoggerOptions: LoggerOptions = {
  minLogLevel: logLevels.INFO,
  providers: [],
}

export class Logger implements ILogger {
  private options: LoggerOptions

  constructor(options?: Partial<LoggerOptions>) {
    this.options = { ...defaultLoggerOptions, ...options }
  }

  log(level: LogLevel, message: string, options?: LogOptions) {
    for (const provider of this.options.providers) {
      provider.log(level, message, options)
    }
  }

  logTrace(message: string, options?: LogOptions): void {
    this.log(logLevels.TRACE, message, options)
  }

  logDebug(message: string, options?: LogOptions): void {
    this.log(logLevels.DEBUG, message, options)
  }

  logInfo(message: string, options?: LogOptions): void {
    this.log(logLevels.INFO, message, options)
  }

  logWarn(message: string, options?: LogOptions): void {
    this.log(logLevels.WARNING, message, options)
  }

  logError(message: string, options?: LogOptions): void {
    this.log(logLevels.ERROR, message, options)
  }

  logCritical(message: string, options?: LogOptions): void {
    this.log(logLevels.CRITICAL, message, options)
  }
}
