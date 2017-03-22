import { connect } from "react-redux";
import * as ApiClient from "../../../../../../../api/build/ApiClient";
import config from "../../../../../Config";
import { IAppState } from "../../../../AppState";
import * as DeviceConfigurationActions from "./DeviceConfigurationActions";
import * as DeviceConfigurationPresenter from "./DeviceConfigurationPresenter";

const mapStateToProps = (state: IAppState): DeviceConfigurationPresenter.IDeviceConfigurationProps => {
    return {
        deviceConfiguration: state.ProjectState.DevicesOverviewState.DeviceConfigurationState.DeviceConfiguration,
    };
};

const mapDispatchToProps = (dispatch: any): DeviceConfigurationPresenter.IDeviceConfigurationProps => {
    return {
    };
};

const DeviceConfiguration = connect(
    mapStateToProps,
    mapDispatchToProps,
)(DeviceConfigurationPresenter.DeviceConfigurationsPresenter);

export default DeviceConfiguration;
