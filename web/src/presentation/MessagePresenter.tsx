import * as React from "react";
import { Message } from "semantic-ui-react";
import { IMessagingState, MessageType } from "../state/MessagingState";

export class MessagePresenter extends React.Component<IMessageProps, IMessageState> {
    constructor(props: IMessageProps) {
        super(props);

        this.state = { dismissed: false };
    }

    public render() {

        let messagingDivStyling = {
            height: "30px",
            paddingBottom: "70px",
        };

        return <div style={messagingDivStyling}>
            {!this.state.dismissed && this.props.state.Message != null && this.props.state.Message !== "" &&
                <Message onDismiss={this.handleDismiss} color={this.getMessageColourFromType(this.props.state.Type) as any} header={this.props.state.Message}/>
            }
        </div>;
    }

    private getMessageColourFromType(messageType: MessageType): string {
        switch (messageType) {
            case MessageType.Error:
                return "red";
            case MessageType.Info:
                return "blue";
            case MessageType.Warning:
                return "yellow";
            case MessageType.Loading:
            default: return "grey";
        }
    }

    private handleDismiss = () => {
        this.setState({dismissed: true});
    }
}

export interface IMessageProps {
    state?: IMessagingState;
}

export interface IMessageState {
    dismissed: boolean;
}
