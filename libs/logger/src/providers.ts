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

/** Represents a single log entry to be sent over HTTP.  */
export interface LogEntryRequest {
  /** Log level of the message (TRACE, DEBUG, INFO, etc.) */
  level: LogLevel
  /** The log message text */
  message: string
  /** Optional additional data associated with the log */
  options?: Record<string, unknown>
}

/** Options for configuring the HttpProvider.  */
export interface HttpProviderOptions {
  /** The URL endpoint where logs should be sent */
  url: string
  /** Optional fetch request initialization options (headers, credentials, etc.) */
  init?: RequestInit
}

/**
 * Sends log messages to a remote server over HTTP.
 *
 * This provider implements the `ILoggingProvider` interface and can be used
 * to send logs in real-time to a backend API for monitoring or analysis.
 */
export class HttpProvider implements ILoggingProvider {
  private options: HttpProviderOptions

  /**
   * Creates a new HttpProvider.
   * @param options - Configuration options including the URL and optional fetch init.
   */
  constructor(options: HttpProviderOptions) {
    this.options = options
  }

  /**
   * Logs a message by sending it as a POST request to the configured URL.
   *
   * @param level - The severity level of the log.
   * @param message - The log message content.
   * @param options - Optional extra metadata to include with the log.
   */
  async log(level: LogLevel, message: string, options?: LogOptions) {
    const { url, init } = this.options

    const data: LogEntryRequest = {
      level,
      message,
      options,
    }

    try {
      const body = JSON.stringify(data)

      const fetchInit: RequestInit = {
        method: "POST",
        body,
        ...init,
      }

      await fetch(url, fetchInit)
    } catch {
      // optionally handle errors silently or forward to another provider
    }
  }
}
