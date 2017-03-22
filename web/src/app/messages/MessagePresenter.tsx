import * as React from "react";
import { Icon, Message, Sidebar, Segment, Menu, Button } from "semantic-ui-react";
import { IMessagingState, MessageType } from "./MessagingState";
import "./MessageStyles.scss";

export class MessagePresenter extends React.Component<IMessageProps, IMessageState> {
    constructor(props: IMessageProps) {
        super(props);

        this.state = { dismissed: true };
    }

    public render() {
        if (!this.props.state.Message || this.props.state.Type === MessageType.Loading) {
            return <div></div>
        }

        let isVisible = !this.state.dismissed;

        return <div className="message-wrapper">
            <Sidebar.Pushable as={Segment}>
                <Sidebar as={Segment} animation='overlay' direction='bottom' visible={isVisible} inverted>
                    {this.props.state.Message}
                    <Button floated="right" circular icon="close" onClick={this.handleDismiss} />
                </Sidebar>
                <Sidebar.Pusher>
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        </div>
    }

    public componentWillReceiveProps(nextProps: IMessageProps) {
        this.setState({ dismissed: false });
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
        this.setState({ dismissed: true });
    }
}

export interface IMessageProps {
    state?: IMessagingState;
}

export interface IMessageState {
    dismissed: boolean;
}
