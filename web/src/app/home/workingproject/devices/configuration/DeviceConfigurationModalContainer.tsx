import { connect } from "react-redux";
import * as ApiClient from "../../../../../../../api/build/ApiClient";
import { IAppState } from "../../../../AppState";
import * as DeviceConfigurationActions from "./DeviceConfigurationActions";
import * as DeviceConfigurationModalPresenter from "./DeviceConfigurationModalPresenter";

const mapStateToProps = (state: IAppState): DeviceConfigurationModalPresenter.IDeviceConfigurationModalProps => {
    return {
        currentMapping: state.ProjectState.DevicesOverviewState.DeviceConfigurationState.PixelMappings,
        deviceConfiguration: state.ProjectState.DevicesOverviewState.DeviceConfigurationState.DeviceConfiguration,
        modalIsOpen: state.ProjectState.DevicesOverviewState.DeviceConfigurationState.ModalIsOpen,
    };
};

const mapDispatchToProps = (dispatch: any): DeviceConfigurationModalPresenter.IDeviceConfigurationModalProps => {
    return {
        onModalClose: () => dispatch(DeviceConfigurationActions.CloseModal()),
        saveMapping: (mappings: ApiClient.ProjectDeviceVersionMapping[]) => {
            dispatch(DeviceConfigurationActions.SetDevicePixelMappings(mappings));
            dispatch(DeviceConfigurationActions.CloseModal());
        },
    };
};

const DeviceConfigurationModal = connect(
    mapStateToProps,
    mapDispatchToProps,
)(DeviceConfigurationModalPresenter.DeviceConfigurationModalPresenter);

export default DeviceConfigurationModal;
