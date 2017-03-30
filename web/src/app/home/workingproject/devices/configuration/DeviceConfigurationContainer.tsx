import { connect } from "react-redux";
import * as ApiClient from "../../../../../../../api/build/ApiClient";
import config from "../../../../../Config";
import { IAppState } from "../../../../AppState";
import * as DeviceConfigurationActions from "./DeviceConfigurationActions";
import * as DeviceConfigurationPresenter from "./DeviceConfigurationPresenter";

const mapStateToProps = (state: IAppState): DeviceConfigurationPresenter.IDeviceConfigurationProps => {
    return {
        deviceConfiguration: state.ProjectState.DevicesOverviewState.DeviceConfigurationState.DeviceConfiguration,
        isMappingConfigured: state.ProjectState.DevicesOverviewState.DeviceConfigurationState.PixelMappings.length > 0,
        modalIsOpen: state.ProjectState.DevicesOverviewState.DeviceConfigurationState.ModalIsOpen,
    };
};

const mapDispatchToProps = (dispatch: any): DeviceConfigurationPresenter.IDeviceConfigurationProps => {
    return {
        horizontalPixelsOnChange: (value: number) => {
            dispatch(DeviceConfigurationActions.ChangeHorizontalPixels(value));
            dispatch(DeviceConfigurationActions.DeterminePixelMappingsValidity());
        },
        onModalOpened: () => dispatch(DeviceConfigurationActions.OpenModal()),
        verticalPixelsOnChange: (value: number) => {
            dispatch(DeviceConfigurationActions.ChangeVerticalPixels(value));
            dispatch(DeviceConfigurationActions.DeterminePixelMappingsValidity());
        },
    };
};

const DeviceConfiguration = connect(
    mapStateToProps,
    mapDispatchToProps,
)(DeviceConfigurationPresenter.DeviceConfigurationsPresenter);

export default DeviceConfiguration;
