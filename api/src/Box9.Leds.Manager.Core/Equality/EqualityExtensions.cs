using System.ComponentModel;

namespace Box9.Leds.Manager.Core.Equality
{
    public static class EqualityExtensions
    {
        public static bool PropertiesAreEqual<T>(this T obj, T other) where T : class
        {
            foreach (PropertyDescriptor property in TypeDescriptor.GetProperties(typeof(T)))
            {
                if (!property.GetValue(obj).Equals(property.GetValue(other)))
                {
                    return false;
                }
            }

            return true;
        }
    }
}
