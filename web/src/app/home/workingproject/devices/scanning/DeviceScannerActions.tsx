import * as ApiClient from "../../../../../../../api/build/ApiClient";
import { IAction } from "../../../../../actions/IAction";

export class Actions {
    public static SetScanningStatus: string = "SET_DEVICE_SCANNING_STATUS";
    public static AddDiscoveredDevice: string = "ADD_DISCOVERED_DEVICE";
}

export const ScanForDevices = (dispatch: any): IAction => {
    dispatch({ type: Actions.SetScanningStatus, value: true});

    // todo: use API to scan for projects

    return {
        type: "DO_NOTHING",
    };
};

export const CancelScanningForDevices = (dispatch: any): IAction => {
    dispatch({ type: Actions.SetScanningStatus, value: false});

    return {
        type: "DO_NOTHING",
    };
};

export const AddDeviceToProject = (dispatch: any, device: ApiClient.DiscoveredDevice, projectId: number): IAction => {

    // todo: use API to add device to project

    return {
        type: "DO_NOTHING",
    };
};
