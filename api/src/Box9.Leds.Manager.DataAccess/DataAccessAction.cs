using System;
using System.Data;

namespace Box9.Leds.Manager.DataAccess
{
    public class DataAccessAction
    {
        internal Action<IDbConnection> Action { get; }

        internal DataAccessAction(Action<IDbConnection> action)
        {
            Action = action;
        }
    }

    public class DataAccessAction<T>
    {
        internal Func<IDbConnection, T> Function { get; }

        internal DataAccessAction(Func<IDbConnection, T> function)
        {
            Function = function;
        }
    }
}
