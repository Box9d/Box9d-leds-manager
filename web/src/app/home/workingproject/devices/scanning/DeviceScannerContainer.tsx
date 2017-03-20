import { connect } from "react-redux";
import * as ApiClient from "../../../../../../../api/build/ApiClient";
import { IAppState } from "../../../../AppState";
import * as DeviceScannerActions from "./DeviceScannerActions";
import * as DeviceScannerPresenter from "./DeviceScannerPresenter";

const mapStateToProps = (state: IAppState): DeviceScannerPresenter.IDeviceScannerProps => {
    return {
        devices: state.ProjectState.DevicesOverviewState.DeviceScannerState.Devices,
        isScanning: state.ProjectState.DevicesOverviewState.DeviceScannerState.IsScanning,
        projectId: state.WorkingProjectState.Project.id,
    };
};

const mapDispatchToProps = (dispatch: any): DeviceScannerPresenter.IDeviceScannerProps => {
    return {
        addDeviceToProject: (device: ApiClient.DiscoveredDevice, projectId: number) => DeviceScannerActions.AddDeviceToProject(dispatch, device, projectId),
        cancelScan: () => DeviceScannerActions.CancelScanningForDevices(dispatch),
        scan: () => DeviceScannerActions.ScanForDevices(dispatch),
    };
};

const SelectVideo = connect(
    mapStateToProps,
    mapDispatchToProps,
)(DeviceScannerPresenter.DeviceScannerPresenter);

export default SelectVideo;
