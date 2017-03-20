﻿using System;
using System.Collections.Generic;
using System.Linq;
using Box9.Leds.Manager.DataAccess.Models;

namespace Box9.Leds.Manager.Services.DeviceSearch
{
    public static class AppPreferencesExtensions
    {
        public static IEnumerable<string> GetIpAddressRange(this AppPreferences appPreferences)
        {
            var start = int.Parse(appPreferences.DeviceSearchStartIp.Split(new[] { "." }, StringSplitOptions.None)[3]);
            var end = int.Parse(appPreferences.DeviceSearchEndIp.Split(new[] { "." }, StringSplitOptions.None)[3]);

            var ipAddressPrefix = appPreferences.DeviceSearchStartIp
                .Split(new[] { "." }, StringSplitOptions.None)
                .Take(3)
                .Aggregate((prev, curr) => prev += "." + curr);

            var ips = new List<string>();
            for (int i = start; i <= end; i++)
            {
                ips.Add(ipAddressPrefix + "." + i);
            }

            ips.Add("127.0.0.1"); // Always search on the loopback IP as well

            return ips;
        }
    }
}
