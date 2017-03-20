import { connect } from "react-redux";
import { IAppState } from "../../../AppState";
import * as DevicesOverviewPresenter from "./DevicesOverviewPresenter";

const mapStateToProps = (state: IAppState): DevicesOverviewPresenter.IDevicesOverviewProps => {
    return {
    };
};

const mapDispatchToProps = (dispatch: any): DevicesOverviewPresenter.IDevicesOverviewProps => {
    return {
    };
};

const DevicesOverview = connect(
    mapStateToProps,
    mapDispatchToProps,
)(DevicesOverviewPresenter.DevicesOverviewPresenter);

export default DevicesOverview;
