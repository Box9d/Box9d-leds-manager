import * as React from "react";
import { Button, Header, Loader, Modal, Segment, Table } from "semantic-ui-react";
import * as ApiClient from "../../../../../../api/build/ApiClient";
import config from "../../../../Config";
import DeviceScanner from "./scanning/DeviceScannerContainer";

export class DevicesOverviewPresenter extends React.Component<IDevicesOverviewProps, undefined> {

    constructor(props: IDevicesOverviewProps) {
        super(props);
    }

    public render() {

       return <div>
           <DeviceScanner/>
        </div>;
    }
}

export interface IDevicesOverviewProps {
}
