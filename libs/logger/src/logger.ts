import { type LogLevel, logLevels } from "./log-levels"
import type { ILoggingProvider } from "./providers"

export interface LogOptions extends Record<string, unknown> {
  error?: Error
}

export interface ILogger {
  /**
   * Writes a log entry with the specified log level.
   * Usually not called directly — prefer the level-specific methods.
   */
  log(level: LogLevel, message: string, options?: LogOptions): void

  /** Logs highly detailed diagnostic information.  */
  trace(message: string, options?: LogOptions): void

  /** Logs debugging information useful during development.  */
  debug(message: string, options?: LogOptions): void

  /** Logs general application flow information.  */
  info(message: string, options?: LogOptions): void

  /** Logs warnings for unexpected but recoverable situations.  */
  warn(message: string, options?: LogOptions): void

  /** Logs errors caused by failed operations.  */
  error(message: string, options?: LogOptions): void

  /** Logs critical failures that may require immediate attention.  */
  critical(message: string, options?: LogOptions): void
}

export interface LoggerOptions {
  /**
   * Minimum log level that will be emitted.
   * Messages below this threshold are ignored.
   * @default logLevels.INFO // 2
   */
  minLogLevel: LogLevel

  /**
   * Providers to use.
   * Providers (output targets) used to write log entries.
   * Can include `ConsoleProvider` and custom providers.
   * @default []
   */
  providers: ILoggingProvider[]
}

/** Default configuration used when no custom options are provided.  */
export const defaultLoggerOptions: LoggerOptions = {
  minLogLevel: logLevels.INFO,
  providers: [],
}

export class Logger implements ILogger {
  private options: LoggerOptions

  /**
   * Initializes the logger with the given options.
   * Merges user-specified options with defaults.
   */
  constructor(options?: Partial<LoggerOptions>) {
    this.options = { ...defaultLoggerOptions, ...options }
  }

  /**
   * Core logging method used by all level-specific helpers.
   * Applies log level filtering and dispatches to all providers.
   */
  log(level: LogLevel, message: string, options?: LogOptions): void {
    if (level < this.options.minLogLevel) return

    for (const provider of this.options.providers) {
      provider.log(level, message, options)
    }
  }

  /** Logs a TRACE-level message. */
  trace(message: string, options?: LogOptions): void {
    this.log(logLevels.TRACE, message, options)
  }

  /** Logs a DEBUG-level message. */
  debug(message: string, options?: LogOptions): void {
    this.log(logLevels.DEBUG, message, options)
  }

  /** Logs a INFO-level message. */
  info(message: string, options?: LogOptions): void {
    this.log(logLevels.INFO, message, options)
  }

  /** Logs a WARN-level message. */
  warn(message: string, options?: LogOptions): void {
    this.log(logLevels.WARNING, message, options)
  }

  /** Logs a ERROR-level message. */
  error(message: string, options?: LogOptions): void {
    this.log(logLevels.ERROR, message, options)
  }

  /** Logs a CRITICAL-level message. */
  critical(message: string, options?: LogOptions): void {
    this.log(logLevels.CRITICAL, message, options)
  }
}
