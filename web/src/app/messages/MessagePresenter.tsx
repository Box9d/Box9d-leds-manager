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
        let isVisible = this.isVisible();
        return <div className="message-wrapper">
            <Sidebar.Pushable as={Segment}>
                <Sidebar as={Segment} animation="overlay" className={this.getMessageColourFromType(this.props.state.Type)} direction="bottom" visible={isVisible} inverted>
                    {this.props.state.Message}
                    <Button floated="right" circular icon="close" onClick={this.handleDismiss} />
                </Sidebar>
                <Sidebar.Pusher>
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        </div>;
    }

    public componentWillReceiveProps(nextProps: IMessageProps) {
        this.setState({ dismissed: false });

        if (this.isVisible()) {
            this.autoDismiss();
        }
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

    private autoDismiss = () => {
        setTimeout(() => {
            this.setState({ dismissed: true });
        }, 5000);
    }

    private handleDismiss = () => {
        this.setState({ dismissed: true });
    }

    private isVisible = (): boolean => {
        return !this.state.dismissed && this.props.state.Message !== "" && this.props.state.Type !== MessageType.Loading;
    }
}

export interface IMessageProps {
    state?: IMessagingState;
}

export interface IMessageState {
    dismissed: boolean;
}
