﻿namespace Box9.Leds.Manager.Services.Store
{
    public interface IStore
    {
        int GetCurrentProjectId();

        void SetCurrentProject(int projectId);

        void ClearCurrentProject();

        bool HasWorkingProject();
    }
}
