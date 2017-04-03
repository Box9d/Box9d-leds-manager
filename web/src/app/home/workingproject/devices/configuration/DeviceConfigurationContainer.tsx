import { connect } from "react-redux";
import * as ApiClient from "../../../../../../../api/build/ApiClient";
import config from "../../../../../Config";
import { IAppState } from "../../../../AppState";
import * as DeviceConfigurationActions from "./DeviceConfigurationActions";
import * as DeviceConfigurationPresenter from "./DeviceConfigurationPresenter";

const mapStateToProps = (state: IAppState): DeviceConfigurationPresenter.IDeviceConfigurationProps => {
    return {
        deviceConfiguration: state.ProjectState.DevicesOverviewState.DeviceConfigurationState.DeviceConfiguration,
        mappings: state.ProjectState.DevicesOverviewState.DeviceConfigurationState.PixelMappings,
        modalIsOpen: state.ProjectState.DevicesOverviewState.DeviceConfigurationState.ModalIsOpen,
        projectDeviceId: state.ProjectState.DevicesOverviewState.DeviceConfigurationState.DeviceConfiguration.projectDeviceId,
    };
};

const mapDispatchToProps = (dispatch: any): DeviceConfigurationPresenter.IDeviceConfigurationProps => {
    return {
        horizontalPercentageOnChange: (percentage: number) => dispatch(DeviceConfigurationActions.ChangeHorizontalPercentage(percentage)),
        horizontalPixelsOnChange: (value: number) => {
            dispatch(DeviceConfigurationActions.ChangeHorizontalPixels(value));
            dispatch(DeviceConfigurationActions.DeterminePixelMappingsValidity());
        },
        onModalOpened: () => dispatch(DeviceConfigurationActions.OpenModal()),
        saveConfiguration: (projectDeviceId: number, configuration: ApiClient.ProjectDeviceVersion, mappings: ApiClient.ProjectDeviceVersionMapping[]) => {
            dispatch(DeviceConfigurationActions.SaveDeviceConfiguration(dispatch, projectDeviceId, configuration, mappings));
        },
        startAtHorizontalPercentageOnChange: (percentage: number) => dispatch(DeviceConfigurationActions.ChangeStartAtHorizontalPercentage(percentage)),
        startAtVerticalPercentageOnChange: (percentage: number) => dispatch(DeviceConfigurationActions.ChangeStartAtVerticalPercentage(percentage)),
        verticalPercentageOnChange: (percentage: number) => dispatch(DeviceConfigurationActions.ChangeVerticalPercentage(percentage)),
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
