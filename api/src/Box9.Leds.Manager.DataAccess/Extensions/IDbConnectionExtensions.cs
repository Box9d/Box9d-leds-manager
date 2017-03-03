using System.Data;
using System.Linq;
using Box9.Leds.Manager.DataModels;
using Dapper.Contrib.Extensions;

namespace Box9.Leds.Manager.DataAccess.Extensions
{
    public static class IDbConnectionExtensions
    {
        public static int GetNextId<T>(this IDbConnection conn) where T : class, IDataModel
        {
            var lastItem = conn.GetAll<T>()
                .OrderByDescending(m => m.Id)
                .FirstOrDefault();

            if (lastItem == null)
            {
                return 1;
            }

            return lastItem.Id + 1;
        }
    }
}
