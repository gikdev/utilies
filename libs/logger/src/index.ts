const logLevels = {
  /** Very detailed messages, mostly for debugging. */
  TRACE: 0,

  /** Debug-level messages, useful during development. */
  DEBUG: 1,

  /** General information about app operation. */
  INFORMATION: 2,

  /** Something unexpected happened, but not critical. */
  WARNING: 3,

  /** An error occurred that should be investigated. */
  ERROR: 4,

  /** Critical failure, application or system may be unstable. */
  CRITICAL: 5,

  /** Logging is disabled, no messages are logged. */
  NONE: 6,
} as const

type LogLevelName = keyof typeof logLevels
type LogLevel = (typeof logLevels)[LogLevelName]

interface LogOptions {
  error?: Error
  meta?: Record<string, unknown>
}

interface Logger {
  log(level: LogLevel, message: string): void
  logTrace(message: string, options?: LogOptions): void
  logDebug(message: string, options?: LogOptions): void
  logInfo(message: string, options?: LogOptions): void
  logWarn(message: string, options?: LogOptions): void
  logError(message: string, options?: LogOptions): void
  logCritical(message: string, options?: LogOptions): void
}
