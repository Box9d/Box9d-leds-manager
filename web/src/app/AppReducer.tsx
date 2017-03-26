import { IAction } from "../actions/IAction";
import { AppState, IAppState } from "./AppState";
import { BackgroundJobsReducer } from "./backgroundjobs/BackgroundJobsReducer";
import { OpenProjectReducer } from "./home/existingproject/OpenProjectReducer";
import { NewProjectFormReducer } from "./home/newproject/NewProjectFormReducer";
import { ProjectReducer } from "./home/workingproject/ProjectReducer";
import { WorkingProjectReducer } from "./home/workingproject/WorkingProjectReducer";
import { MessageReducer } from "./messages/MessageReducer";
import { NavReducer } from "./nav/NavReducer";
import { SettingsReducer } from "./settings/SettingsReducer";
import { DeviceConfigurationReducer } from "./home/workingproject/devices/configuration/DeviceConfigurationReducer";

export const appReducer = (state: IAppState = new AppState(), action: IAction): IAppState => {
    let newState: IAppState = state;
    newState.NavState = NavReducer(newState.NavState, action);
    newState = BackgroundJobsReducer(newState, action);
    newState.NewProjectFormState = NewProjectFormReducer(newState.NewProjectFormState, action);
    newState.ProjectState = ProjectReducer(newState.ProjectState, action);
    newState.MessageState = MessageReducer(newState.MessageState, action);
    newState.OpenProjectState = OpenProjectReducer(newState.OpenProjectState, action);
    newState.WorkingProjectState = WorkingProjectReducer(newState.WorkingProjectState, action);
    newState.SettingsState = SettingsReducer(newState.SettingsState, action);
    newState.DeviceConfigurationState = DeviceConfigurationReducer(newState.DeviceConfigurationState, action);

    return (Object as any).assign({}, state, {}, { newState });
};
