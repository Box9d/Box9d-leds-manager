export interface IMessagingState {
    Type: MessageType;
    Message: string;
}

export class MessagingState implements IMessagingState {
    public Type: MessageType;
    public Message: string;
}

export enum MessageType {
    Info, Warning, Error, Loading,
}
