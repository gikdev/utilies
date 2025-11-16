public interface ILogger
{
    void Log(LogLevel level, string message);
    bool IsEnabled(LogLevel level);
    IDisposable BeginScope<TState>(TState state);
}

public enum LogLevel
{
    Trace,   // very detailed logs, for dev/debugging
    Debug,   // debugging info
    Information, // general info
    Warning, // something might be wrong
    Error,   // something went wrong
    Critical // major failure
}
