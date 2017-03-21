import * as ApiClient from "../../../../../../../api/build/ApiClient";
import { IAction } from "../../../../../actions/IAction";
import config from "../../../../../Config";
import * as MessageActions from "../../../../messages/MessageActions";
import { MessageType } from "../../../../messages/MessagingState";
import * as DevicesOverviewActions from "../DevicesOverviewActions";

export class Actions {
    public static SetScanningStatus: string = "SET_DEVICE_SCANNING_STATUS";
    public static SetDiscoveredDevices: string = "SET_DISCOVERED_DEVICES";
}

export const ScanForDevices = (dispatch: any, pollPeriodInMilliseconds: number): IAction => {

    let apiClient = new ApiClient.DeviceDiscoveryClient(config.apiUrl);
    apiClient.startSearchForDevices().then((startSearchResponse: ApiClient.GlobalJsonResultOfEmptyResult) => {
        if (!startSearchResponse.successful) {
            dispatch(MessageActions.SetMessageAndMessageType(dispatch, "Could not scan for devices: " + startSearchResponse.errorMessage, MessageType.Error));
        } else {
            dispatch({ type: Actions.SetScanningStatus, value: true});
            dispatch({ type: Actions.SetDiscoveredDevices, value: new Array<ApiClient.DiscoveredDevice>()});
            UpdateScanStatus(dispatch, apiClient, pollPeriodInMilliseconds);
        }
    });

    return {
        type: "DO_NOTHING",
    };
};

const UpdateScanStatus = (dispatch: any, apiClient: ApiClient.DeviceDiscoveryClient, pollPeriodInMilliseconds: number) => {
    apiClient.getDeviceSearchStatus().then((searchStatusResponse: ApiClient.GlobalJsonResultOfDeviceSearchStatus) => {
        if (!searchStatusResponse.successful) {
            dispatch(MessageActions.SetMessageAndMessageType(dispatch, "Error whilst scanning for devices: " + searchStatusResponse.errorMessage, MessageType.Error));
            dispatch({ type: Actions.SetScanningStatus, value: false});
        } else {
            dispatch({ type: Actions.SetDiscoveredDevices, value: searchStatusResponse.result.discoveredDevices });
            if (!searchStatusResponse.result.isSearching) {
                dispatch({ type: Actions.SetScanningStatus, value: false});
            } else {
                setTimeout(() => UpdateScanStatus(dispatch, apiClient, pollPeriodInMilliseconds), pollPeriodInMilliseconds);
            }
        }
    });
};

export const CancelScanningForDevices = (dispatch: any): IAction => {

    // If the cancellation fails, there's nothing that can be done about it, so just send the request and ignore the response
    let apiClient = new ApiClient.DeviceDiscoveryClient(config.apiUrl).cancelSearchForDevices();
    dispatch({ type: Actions.SetScanningStatus, value: false});

    return {
        type: "DO_NOTHING",
    };
};

export const AddDeviceToProject = (dispatch: any, device: ApiClient.DiscoveredDevice, projectId: number): IAction => {

    dispatch(MessageActions.SetMessageAndMessageType(dispatch, "Adding device to project...", MessageType.Loading));

    let apiClient = new ApiClient.DeviceDiscoveryClient(config.apiUrl);
    apiClient.addDiscoveredDeviceToProject(projectId, device).then((response: ApiClient.GlobalJsonResultOfProjectDevice) => {
        if (!response.successful) {
            dispatch(MessageActions.SetMessageAndMessageType(dispatch, "Could not add device to project: " + response.errorMessage, MessageType.Error));
        } else {
            dispatch(MessageActions.SetMessageAndMessageType(dispatch, "Device added sucessfully", MessageType.Info));
            dispatch(DevicesOverviewActions.FetchProjectDevices(dispatch, projectId));
        }
    });

    return {
        type: "DO_NOTHING",
    };
};

function sleep(ms: number) {
  return new Promise((resolve: any) => setTimeout(resolve, ms));
}
