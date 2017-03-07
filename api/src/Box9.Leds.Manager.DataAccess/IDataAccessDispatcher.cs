using System;

namespace Box9.Leds.Manager.DataAccess
{
    public interface IDataAccessDispatcher
    {
        T Dispatch<T>(DataAccessAction<T> dataAccessFunction);

        void Dispatch(DataAccessAction dataAccessAction);
    }
}
