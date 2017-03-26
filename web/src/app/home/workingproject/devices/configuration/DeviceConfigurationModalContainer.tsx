import { connect } from "react-redux";
import { IAppState } from "../../../../AppState";
import * as DeviceConfigurationActions from "./DeviceConfigurationActions";
import * as DeviceConfigurationModalPresenter from "./DeviceConfigurationModalPresenter";

const mapStateToProps = (state: IAppState): DeviceConfigurationModalPresenter.IDeviceConfigurationModalProps => {
    return {
        modalIsOpen: state.DeviceConfigurationState.ModalIsOpen,
    };
};

const mapDispatchToProps = (dispatch: any): DeviceConfigurationModalPresenter.IDeviceConfigurationModalProps => {
    return {
        onModalClose: () => dispatch(DeviceConfigurationActions.CloseModal()),
        saveMapping: () => {
            dispatch(DeviceConfigurationActions.SetMappingConfigured());
            dispatch(DeviceConfigurationActions.CloseModal());
        },
    };
};

const DeviceConfigurationModal = connect(
    mapStateToProps,
    mapDispatchToProps,
)(DeviceConfigurationModalPresenter.DeviceConfigurationModalPresenter);

export default DeviceConfigurationModal;
