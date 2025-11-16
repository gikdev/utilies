import type { LogLevel } from "./log-levels"
import type { LogOptions } from "./logger"
import { getLogLevelEmoji } from "./utils"

/**
 * Interface for all logging providers.
 * A provider is responsible for processing or outputting log entries
 * (e.g., console, file, network, storage, external service).
 */
export interface ILoggingProvider {
  log(
    level: LogLevel,
    message: string,
    options?: LogOptions,
  ): void | Promise<void>
}

/**
 * Simple provider that writes log entries to the browser or NodeJS console.
 * Adds an emoji prefix based on the log level for improved readability.
 */
export class ConsoleProvider implements ILoggingProvider {
  log(level: LogLevel, message: string, options?: LogOptions) {
    console.log(getLogLevelEmoji(level), message, options)
  }
}
