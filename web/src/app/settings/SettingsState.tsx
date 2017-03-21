export interface ISettingsState {
    editIpStart?: string;
    editIpEnd?: string;
}

export class SettingsState implements ISettingsState {    
    public editIpStart: string;
    public editIpEnd: string;
}