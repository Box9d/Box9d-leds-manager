import * as React from "react";
import { Accordion, Divider, Segment, Table } from "semantic-ui-react";
import * as ApiClient from "../../../../../../../api/build/ApiClient";

export class DeviceConfigurationsPresenter extends React.Component<IDeviceConfigurationProps, undefined> {

    constructor(props: IDeviceConfigurationProps) {
        super(props);
    }

    public render(): JSX.Element {
        return <div>Device ready to be configured</div>;
    }
}

export interface IDeviceConfigurationProps {
    deviceConfiguration?: ApiClient.ProjectDeviceVersion;
};
