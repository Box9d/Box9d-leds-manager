using Box9.Leds.Manager.Core.Validation;
using System;

namespace Box9.Leds.Manager.Services.Store
{
    public class InMemoryStore : IStore
    {
        private int? currentProjectId;

        public InMemoryStore()
        {
            currentProjectId = null;
        }

        public void ClearCurrentProject()
        {
            currentProjectId = null;
        }

        public int GetCurrentProjectId()
        {
            Guard.This(currentProjectId).AgainstDefaultValue("Current project has not been set");

            return currentProjectId.Value;
        }

        public void SetCurrentProject(int projectId)
        {
            currentProjectId = projectId;
        }
    }
}
