using System.Data;
using Box9.Leds.Manager.DataAccess.Models;
using Dapper.Contrib.Extensions;

namespace Box9.Leds.Manager.DataAccess.Actions
{
    public static class AppPreferencesActions
    {
        public static DataAccessAction<AppPreferences> GetAppPreferences()
        {
            return new DataAccessAction<AppPreferences>((IDbConnection conn) =>
            {
                return conn.Get<AppPreferences>(1);
            });
        }

        public static DataAccessAction<AppPreferences> UpdateAppPreferences(AppPreferences appPreferences)
        {
            appPreferences.Validate();
            appPreferences.Id = 1;

            return new DataAccessAction<AppPreferences>((IDbConnection conn) =>
            {
                conn.Update(appPreferences);
                return appPreferences;
            });
        }
    }
}
