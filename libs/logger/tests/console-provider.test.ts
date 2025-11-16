import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { ConsoleProvider, Logger } from "../src"

describe("ConsoleLoggerProvider", () => {
  let consoleProvider: ConsoleProvider
  let logger: Logger
  let logSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    consoleProvider = new ConsoleProvider()

    logger = new Logger({
      providers: [consoleProvider],
    })

    logSpy = vi.spyOn(console, "log").mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("works correctly with `ConsoleProvider`", () => {
    logger.logInfo("hello")

    expect(logSpy).toHaveBeenCalledOnce()
    expect(logSpy).toHaveBeenCalledWith("ℹ", "hello", undefined)
  })
})
