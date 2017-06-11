using System;
using Box9.Leds.Manager.Core.Validation;
using Box9.Leds.Manager.DataModels;
using Dapper.Contrib.Extensions;

namespace Box9.Leds.Manager.DataAccess.Models
{
    [Table("AppPreferences")]
    public class AppPreferences : IValidatable, IDataModel
    {
        public int Id { get; internal set; }

        public string DeviceSearchStartIp { get; set; }

        public string DeviceSearchEndIp { get; set; }

        public int PingTimeout { get; set; }

        public int PlaybackBuffer { get; set; }

        public void Validate()
        {
            Guard.This(DeviceSearchStartIp).AgainstNonIpAddressFormat(
                string.Format("IP address specified for device search range is invalid '{0}'", DeviceSearchStartIp));

            Guard.This(DeviceSearchEndIp).AgainstNonIpAddressFormat(
                string.Format("IP address specified for device search range is invalid '{0}'", DeviceSearchEndIp));

            var startIpComponents = DeviceSearchStartIp.Split(new[] { "." }, StringSplitOptions.None);
            var endIpComponents = DeviceSearchEndIp.Split(new[] { "." }, StringSplitOptions.None);

            Guard.This(startIpComponents[0]).WithRule(val => val == endIpComponents[0], "Specified IP address range must be in the same subnet");
            Guard.This(startIpComponents[1]).WithRule(val => val == endIpComponents[1], "Specified IP address range must be in the same subnet");
            Guard.This(startIpComponents[2]).WithRule(val => val == endIpComponents[2], "Specified IP address range must be in the same subnet");
        }
    }
}
