using System;

namespace Box9.Leds.Manager.Core.Validation
{
    public static class Guard
    {
        public static GuardThis<T> This<T>(T obj)
        {
            return new GuardThis<T>(obj);
        }
    }
}
