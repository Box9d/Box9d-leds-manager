import { connect } from "react-redux";
import { IAppState } from "../../../AppState";
import * as DeviceConfigurationActions from "./configuration/DeviceConfigurationActions";
import * as DevicesOverviewActions from "./DevicesOverviewActions";
import * as DevicesOverviewPresenter from "./DevicesOverviewPresenter";

const mapStateToProps = (state: IAppState): DevicesOverviewPresenter.IDevicesOverviewProps => {
    return {
        devices: state.ProjectState.DevicesOverviewState.ProjectDevices,
        projectId: state.WorkingProjectState.Project.id,
    };
};

const mapDispatchToProps = (dispatch: any): DevicesOverviewPresenter.IDevicesOverviewProps => {
    return {
        clearDeviceConfiguration: () => dispatch(DeviceConfigurationActions.ClearDeviceConfiguration(dispatch)),
        fetchDeviceConfiguration: (deviceId: number, projectId: number) => dispatch(DeviceConfigurationActions.FetchDeviceConfiguration(dispatch, deviceId, projectId)),
        fetchDevices: (projectId: number) => dispatch(DevicesOverviewActions.FetchProjectDevices(dispatch, projectId)),
        removeDeviceFromProject: (deviceId: number, projectId: number) => dispatch(DevicesOverviewActions.RemoveDeviceFromProject(dispatch, deviceId, projectId)),
    };
};

const DevicesOverview = connect(
    mapStateToProps,
    mapDispatchToProps,
)(DevicesOverviewPresenter.DevicesOverviewPresenter);

export default DevicesOverview;
