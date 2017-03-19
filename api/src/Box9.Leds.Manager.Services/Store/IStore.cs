using Box9.Leds.Manager.DataAccess.Models;
using System;

namespace Box9.Leds.Manager.Services.Store
{
    public interface IStore
    {
        int GetWorkingProjectId();

        void SetCurrentProject(int projectId);

        void ClearCurrentProject();

        bool HasWorkingProject();
    }
}
