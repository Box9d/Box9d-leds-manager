using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using Box9.Leds.Manager.Core.Config;

namespace Box9.Leds.Manager.Core.Logging
{
    public class Logger : ILogger
    {
        private IConfiguration configuration;
        private ConcurrentQueue<string> messages;

        public Logger(IConfiguration configuration)
        {
            this.configuration = configuration;
            messages = new ConcurrentQueue<string>();
        }

        public IEnumerable<string> Log
        {
            get
            {
                return messages;
            }
        }

        public void ClearLog()
        {
            messages = new ConcurrentQueue<string>();
        }

        public void LogException(Exception ex)
        {
            messages.Enqueue(MessagePrefix(Severity.Error) + ex.Message + Environment.NewLine + ex.StackTrace);
        }

        public void LogInformation(string message)
        {
            messages.Enqueue(MessagePrefix(Severity.Info) + message);
        }

        public void LogWarning(string message)
        {
            messages.Enqueue(MessagePrefix(Severity.Warning) + message);
        }

        private string MessagePrefix(Severity severity)
        {
            return string.Format("[{0}\t{1}]: ", DateTime.Now.ToString("s"), severity.ToString());
        }

        private class Severity
        {
            private string value;

            public static Severity Info
            {
                get
                {
                    return new Severity { value = "INFO" };
                }
            }

            public static Severity Warning
            {
                get
                {
                    return new Severity { value = "Warning" };
                }
            }

            public static Severity Error
            {
                get
                {
                    return new Severity { value = "Error" };
                }
            }

            private Severity()
            { 
            }

            public override string ToString()
            {
                return value;
            }
        }
    }
}
