namespace Box9.Leds.Manager.Core.Validation
{
    public interface IValidatable
    {
        void Validate();
    }

    public interface IValidatable<T>
    {
        void Validate(T validateAgainst);
    }
}
