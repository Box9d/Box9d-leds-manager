export interface IMessagingState {
    Type: MessageType;
    Message: string;
}

export class MessagingState implements IMessagingState {
    public Type: MessageType;
    public Message: string;

    constructor() {
        this.Type = MessageType.Info;
        this.Message = null;
    }
}

export enum MessageType {
    Info, Warning, Error, Loading,
}
