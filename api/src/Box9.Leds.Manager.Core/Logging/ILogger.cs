using System;
using System.Collections.Generic;

namespace Box9.Leds.Manager.Core.Logging
{
    public interface ILogger
    {
        IEnumerable<string> Log { get; }

        void ClearLog();

        void LogInformation(string message);

        void LogWarning(string message);

        void LogException(Exception ex);
    }
}
