using Box9.Leds.Manager.DataAccess.Actions;
using Box9.Leds.Manager.DataAccess.Models;
using Xunit;

namespace Box9.Leds.Manager.DataAccess.Tests.Integration
{
    public class AppPreferencesActionsTests
    {
        [Fact]
        public void CanGetAppPreferences()
        {

            using (var dbFactory = new TestDbConnectionFactory())
            using (var conn = dbFactory.Database())
            {
                var appPreferences = AppPreferencesActions.GetAppPreferences().Function(conn);

                Assert.NotNull(appPreferences);
            } 
        }

        [Fact]
        public void CanSetAppPreferences()
        {
            using (var dbFactory = new TestDbConnectionFactory())
            using (var conn = dbFactory.Database())
            {
                var appPreferences = new AppPreferences
                {
                    DeviceSearchStartIp = "192.168.1.250",
                    DeviceSearchEndIp = "192.168.1.255"
                };

                var updatedAppPreferences = AppPreferencesActions.UpdateAppPreferences(appPreferences).Function(conn);

                Assert.Equal(appPreferences.DeviceSearchStartIp, updatedAppPreferences.DeviceSearchStartIp);
                Assert.Equal(appPreferences.DeviceSearchEndIp, updatedAppPreferences.DeviceSearchEndIp);
            }
        }
    }
}
