import { connect } from "react-redux";
import { IAppState } from "../../../../AppState";
import * as DeviceScannerPresenter from "./DeviceScannerPresenter";

const mapStateToProps = (state: IAppState): DeviceScannerPresenter.IDeviceScannerProps => {
    return {
    };
};

const mapDispatchToProps = (dispatch: any): DeviceScannerPresenter.IDeviceScannerProps => {
    return {
    };
};

const SelectVideo = connect(
    mapStateToProps,
    mapDispatchToProps,
)(DeviceScannerPresenter.DeviceScannerPresenter);

export default SelectVideo;
