import type { LogLevel } from "./log-levels"
import type { LogOptions } from "./logger"
import { getLogLevelEmoji } from "./utils"

export interface ILoggingProvider {
  log(
    level: LogLevel,
    message: string,
    options?: LogOptions,
  ): void | Promise<void>
}

export class ConsoleProvider implements ILoggingProvider {
  log(level: LogLevel, message: string, options?: LogOptions) {
    console.log(getLogLevelEmoji(level), message, options)
  }
}
