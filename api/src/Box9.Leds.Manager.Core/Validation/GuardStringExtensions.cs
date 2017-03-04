using System.Text.RegularExpressions;

namespace Box9.Leds.Manager.Core.Validation
{
    public static class GuardStringExtensions
    {
        public static GuardThis<string> AgainstNullOrEmpty(this GuardThis<string> guard, string errorMessage)
        {
            return guard.WithRule(val => !string.IsNullOrEmpty(val), errorMessage);
        }

        public static GuardThis<string> AgainstNonIpAddressFormat(this GuardThis<string> guard, string errorMessage)
        {
            var match = Regex.Match(guard.Obj, @"\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}");

            return guard.WithRule(val => match.Success, errorMessage);
        }
    }
}
