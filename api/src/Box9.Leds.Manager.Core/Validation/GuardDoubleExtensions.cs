namespace Box9.Leds.Manager.Core.Validation
{
    public static class GuardDoubleExtensions
    {
        public static GuardThis<double> AgainstNegative(this GuardThis<double> guard, string errorMessage)
        {
            return guard.WithRule(val => val >= 0, errorMessage);
        }

        public static GuardThis<double> AgainstZero(this GuardThis<double> guard, string errorMessage)
        {
            return guard.WithRule(val => val != 0, errorMessage);
        }
    }
}
