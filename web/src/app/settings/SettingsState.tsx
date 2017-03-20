import * as ApiClient from "../../../../api/build/ApiClient";
import config from "../../Config";

export interface ISettingsState {
    startIp: string;
    endIp: string;
    isStartIpChanged: boolean;
    isEndIpChanged: boolean;
    isLoading: boolean;
}

export class SettingsState implements ISettingsState {
    public startIp: string;
    public endIp: string;
    public isLoading: boolean;
    public isStartIpChanged: boolean;
    public isEndIpChanged: boolean;
}
