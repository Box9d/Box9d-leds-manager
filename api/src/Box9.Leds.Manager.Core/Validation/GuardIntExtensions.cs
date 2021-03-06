﻿namespace Box9.Leds.Manager.Core.Validation
{
    public static class GuardIntExtensions
    {
        public static GuardThis<int> AgainstNegative(this GuardThis<int> guard, string errorMessage)
        {
            return guard.WithRule(val => val >= 0, errorMessage);
        }

        public static GuardThis<int> AgainstZero(this GuardThis<int> guard, string errorMessage)
        {
            return guard.WithRule(val => val != 0, errorMessage);
        }

        public static GuardThis<int> AgainstOutsideOfRange(this GuardThis<int> guard, int minValue, int maxValue, string errorMessage)
        {
            return guard.WithRule(val => val <= maxValue || val >= minValue, errorMessage);
        }
    }
}
