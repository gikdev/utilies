export const logLevels = {
  /**
   * Most detailed logging level.
   * Used for diagnosing intricate issues and tracing every step of execution.
   */
  TRACE: 0,

  /**
   * Development-focused debugging information.
   * Helpful for understanding control flow, state changes, and internal behavior.
   */
  DEBUG: 1,

  /**
   * High-level events that describe normal application behavior.
   * Useful for understanding overall system activity.
   */
  INFO: 2,

  /**
   * Something unexpected occurred, but the application can continue operating.
   * Indicates potential problems or unusual states.
   */
  WARNING: 3,

  /**
   * An operation failed or an error occurred.
   * Should be investigated, but the system is still functioning.
   */
  ERROR: 4,

  /**
   * A severe failure that causes system instability or prevents further execution.
   * Requires immediate attention.
   */
  CRITICAL: 5,

  /**
   * Logging disabled.
   * No messages at or below this level will be emitted.
   */
  NONE: 6,
} as const

export type LogLevelName = keyof typeof logLevels

export type LogLevel = (typeof logLevels)[LogLevelName]
