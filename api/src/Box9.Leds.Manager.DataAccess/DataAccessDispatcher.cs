using InstaSqlite;

namespace Box9.Leds.Manager.DataAccess
{
    public class DataAccessDispatcher : IDataAccessDispatcher
    {
        private readonly IDbManager dbManager;

        public DataAccessDispatcher(IDbManager dbManager)
        {
            this.dbManager = dbManager;
        }

        public void Dispatch(DataAccessAction dataAccessAction)
        {         
            using (var conn = dbManager.Database())
            {
                dataAccessAction.Action(conn);
            }
        }

        public T Dispatch<T>(DataAccessAction<T> dataAccessFunction)
        {
            using (var conn = dbManager.Database())
            {
                return dataAccessFunction.Function(conn);
            }
        }
    }
}
