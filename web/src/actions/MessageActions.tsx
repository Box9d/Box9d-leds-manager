import { MessageType } from "../state/MessagingState";
import { IAction } from "./IAction";

export class Actions {
    public static SetMessage = "SET_MESSAGE";
    public static SetMessageType = "SET_MESSAGE_TYPE";
}

export const SetMessageAndMessageType = (dispatch: any, message: string, type: MessageType): IAction => {
    dispatch(SetMessage(message));
    dispatch(SetMessageType(type));

    return {
        type: "DO_NOTHING",
        value: null,
    };
};

export const ClearMessage = (): IAction => {
    return {
        type: Actions.SetMessage,
        value: "",
    };
};

export const SetMessage = (message: string): IAction => {
    return {
        type: Actions.SetMessage,
        value: message,
    };
};

export const SetMessageType = (type: MessageType): IAction => {
    return {
        type: Actions.SetMessageType,
        value: type,
    };
};
