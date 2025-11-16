import { describe, expect, it } from "vitest"
import {
  type ILoggingProvider,
  Logger,
  type LogLevel,
  type LogOptions,
} from "../src"

type LogEntry = {
  level: LogLevel
  message: string
  options?: LogOptions
}

class MemoryProvider implements ILoggingProvider {
  logs: LogEntry[] = []

  log(
    level: LogLevel,
    message: string,
    options?: LogOptions,
  ): void | Promise<void> {
    this.logs.push({ level, message, options })
  }
}

describe("Logger", () => {
  it("should instantiate successfully.", () => {
    const logger = new Logger()

    expect(logger instanceof Logger).toBeTruthy()
  })

  it("should log properly", () => {
    const memoryProvider = new MemoryProvider()

    const logger = new Logger({
      providers: [memoryProvider],
    })

    const errorMsg = "Sth went wrong, just to test."

    logger.logError(errorMsg)

    console.log(memoryProvider.logs)

    expect(memoryProvider.logs.length).toBe(1)
    expect(memoryProvider.logs[0].message).toBe(errorMsg)
  })
})
