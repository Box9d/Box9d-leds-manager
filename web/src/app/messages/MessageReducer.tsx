import { IAction } from "../../actions/IAction";
import { Actions } from "./MessageActions";
import { IMessagingState } from "./MessagingState";

export const MessageReducer = (state: IMessagingState, action: IAction): IMessagingState => {
    let newState: IMessagingState = state;

    switch (action.type) {
        case Actions.SetMessage:
            newState.Message = action.value;
            break;
        case Actions.SetMessageType:
            newState.Type = action.value;
            break;
        default: return state;
    }

    return (Object as any).assign({}, state, {}, { newState });
};
