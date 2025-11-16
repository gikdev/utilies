public interface ILogger {
  void Log(LogLevel level, string message);
  bool IsEnabled(LogLevel level);
  IDisposable BeginScope<TState>(TState state);
}
