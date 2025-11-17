import { type LogLevel, logLevels } from "./log-levels"

export function getLogLevelEmoji(logLevel: LogLevel) {
  switch (logLevel) {
    case logLevels.TRACE:
      return "🐾"

    case logLevels.DEBUG:
      return "🔎"

    case logLevels.INFO:
      return "ℹ️"

    case logLevels.WARNING:
      return "⚠️"

    case logLevels.ERROR:
      return "❌"

    case logLevels.CRITICAL:
      return "💣"

    default:
      return ""
  }
}
