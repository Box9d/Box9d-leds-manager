import { connect } from "react-redux";
import { IAppState } from "../../../AppState";
import * as DevicesConfigurationStatusPresenter from "./DevicesConfigurationStatusPresenter";
import * as DevicesOverviewActions from "./DevicesOverviewActions";

const mapStateToProps = (state: IAppState): DevicesConfigurationStatusPresenter.IDevicesConfigurationStatusProps => {
    return {
        numberOfDevices: state.ProjectState.DevicesOverviewState.DevicesWithStatuses.length,
        projectId: state.WorkingProjectState.Project.id,
    };
};

const mapDispatchToProps = (dispatch: any): DevicesConfigurationStatusPresenter.IDevicesConfigurationStatusProps => {
    return {
        checkDevicesConfigurationStatus: (projectId: number) => dispatch(DevicesOverviewActions.FetchProjectDevices(dispatch, projectId)),
    };
};

const DevicesConfigurationStatus = connect(
    mapStateToProps,
    mapDispatchToProps,
)(DevicesConfigurationStatusPresenter.DevicesConfigurationStatusPresenter);

export default DevicesConfigurationStatus;
