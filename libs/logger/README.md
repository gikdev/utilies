# @gikdev/logger

A lightweight TypeScript logging library inspired by the `.NET ILogger` pattern.

`@gikdev/logger` brings familiar concepts such as **log levels**, **providers**, and **structured logging** into the JavaScript/TypeScript ecosystem — with zero external dependencies.

Ideal for React apps, Node.js services, or any TS project that needs readable, consistent, configurable logs.

---

## 🚀 Getting Started

### 1. Install

```sh
npm install @gikdev/logger
```

### 2. Create a logger instance

```ts
import {
  Logger,
  ConsoleProvider,
  logLevels,
  type LoggerOptions
} from "@gikdev/logger"

const consoleProvider = new ConsoleProvider()

const loggerOptions: LoggerOptions = {
  // Minimum level that will be logged
  minLogLevel: logLevels.INFO,

  // One or more providers (console, file, remote, custom, etc.)
  providers: [consoleProvider],
}

const logger = new Logger(loggerOptions)
```

### 3. Use the logger

```ts
logger.trace("Trace level message")
logger.debug("Debug level message")
logger.info("Application started")
logger.warn("Something looks off…")
logger.error("An error occurred")
logger.critical("Critical: system failure!")
```

---

## 📦 Features

* ✅ Familiar .NET-inspired log levels
* ✅ Multiple providers support
* ✅ Minimal API, zero dependencies
* ✅ Fully typed, works everywhere (React, Node, SSR, etc.)
* ✅ Easily mockable for unit testing
* ✅ Extend with custom providers (FileProvider, HttpProvider, SentryProvider…)
* ✅ Works in browser and server environments

---

## 🔌 Example: Custom Provider

```ts
import type { ILoggingProvider, LogLevel, LogOptions } from "@gikdev/logger"

export class ToastProvider implements ILoggingProvider {
  // ⚠ Note: Make sure your `log()` method doesn't throw error...
  log(level: LogLevel, message: string, options?: LogOptions) {
    toast(message)
  }
}

// in another place:

const logger = new Logger({
  providers: [
    new ConsoleProvider(),
    new ToastProvider(),
  ],
})

logger.info("Sth happened.")
// Logs to console & toast!
```
