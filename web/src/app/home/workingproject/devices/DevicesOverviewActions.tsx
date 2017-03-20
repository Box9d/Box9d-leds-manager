import * as ApiClient from "../../../../../../api/build/ApiClient";
import { IAction } from "../../../../actions/IAction";
import config from "../../../../Config";
import * as MessageActions from "../../../messages/MessageActions";
import { MessageType } from "../../../messages/MessagingState";

export class Actions {
    public static SetShouldFetchProjectDevices: string = "SHOULD_FETCH_PROJECT_DEVICES";
}

export const FetchProjectDevices = (): IAction => {
    // todo: fetch project devices from API

    return {
        type: "DO_NOTHING",
    };
};
