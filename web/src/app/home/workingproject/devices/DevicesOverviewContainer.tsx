import { connect } from "react-redux";
import { IAppState } from "../../../AppState";
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
        fetchDevices: (projectId: number) => dispatch(DevicesOverviewActions.FetchProjectDevices(dispatch, projectId)),
    };
};

const DevicesOverview = connect(
    mapStateToProps,
    mapDispatchToProps,
)(DevicesOverviewPresenter.DevicesOverviewPresenter);

export default DevicesOverview;
