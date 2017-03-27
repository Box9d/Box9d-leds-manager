import { connect } from "react-redux";
import * as ApiClient from "../../../../../../../api/build/ApiClient";
import config from "../../../../../Config";
import { IAppState } from "../../../../AppState";
import * as DeviceConfigurationActions from "./DeviceConfigurationActions";
import * as DeviceConfigurationPresenter from "./DeviceConfigurationPresenter";

const mapStateToProps = (state: IAppState): DeviceConfigurationPresenter.IDeviceConfigurationProps => {
    return {
        deviceConfiguration: state.ProjectState.DevicesOverviewState.DeviceConfigurationState.DeviceConfiguration,
        isMappingConfigured: state.DeviceConfigurationState.IsMappingConfigured,
    };
};

const mapDispatchToProps = (dispatch: any): DeviceConfigurationPresenter.IDeviceConfigurationProps => {
    return {
        onModalOpened: () => dispatch(DeviceConfigurationActions.OpenModal()),
        horizontalPixelsOnChange: (value: number) => dispatch(DeviceConfigurationActions.ChangeHorizontalPixels(value)),
        verticalPixelsOnChange: (value: number) => dispatch(DeviceConfigurationActions.ChangeVerticalPixels(value)),
    };
};

const DeviceConfiguration = connect(
    mapStateToProps,
    mapDispatchToProps,
)(DeviceConfigurationPresenter.DeviceConfigurationsPresenter);

export default DeviceConfiguration;
