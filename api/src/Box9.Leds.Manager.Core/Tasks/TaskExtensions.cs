using System.Threading.Tasks;

namespace Box9.Leds.Manager.Core.Tasks
{
    public static class TaskExtensions
    {
        public static void Ignore(this Task task)
        {
            return;
        }

        public static void Ignore<T>(this Task<T> task)
        {
            return;
        }
    }
}
