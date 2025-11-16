export const logLevels = {
  /** Very detailed messages, mostly for debugging. */
  TRACE: 0,

  /** Debug-level messages, useful during development. */
  DEBUG: 1,

  /** General information about app operation. */
  INFO: 2,

  /** Something unexpected happened, but not critical. */
  WARNING: 3,

  /** An error occurred that should be investigated. */
  ERROR: 4,

  /** Critical failure, application or system may be unstable. */
  CRITICAL: 5,

  /** Logging is disabled, no messages are logged. */
  NONE: 6,
} as const
export type LogLevelName = keyof typeof logLevels
export type LogLevel = (typeof logLevels)[LogLevelName]
