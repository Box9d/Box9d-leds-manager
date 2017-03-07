namespace Box9.Leds.Manager.Services.DeviceSearch
{
    public interface IPinger
    {
        bool IsResponding(string ipAddress);

        string GetHostName(string ipAddress);
    }
}
