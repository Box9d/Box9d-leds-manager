using Box9.Leds.Manager.Core.Validation;

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

        public int GetWorkingProjectId()
        {
            Guard.This(currentProjectId).AgainstDefaultValue("Current project has not been set");

            return currentProjectId.Value;
        }

        public bool HasWorkingProject()
        {
            return currentProjectId.HasValue;
        }

        public void SetCurrentProject(int projectId)
        {
            currentProjectId = projectId;
        }
    }
}
