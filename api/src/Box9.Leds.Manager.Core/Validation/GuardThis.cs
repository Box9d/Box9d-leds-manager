using System;

namespace Box9.Leds.Manager.Core.Validation
{
    public class GuardThis<T>
    {
        internal T Obj { get; }

        public GuardThis(T obj)
        {
            Obj = obj;
        }

        public GuardThis<T> AgainstDefaultValue(string errorMessage)
        {
            return WithRule(val => val != null && !val.Equals(default(T)), errorMessage);
        }

        public GuardThis<T> WithRule(Func<T, bool> rule, string errorMessage)
        {
            if (!rule(Obj))
            {
                throw new ArgumentException(errorMessage);
            }

            return this;
        }
    }
}
