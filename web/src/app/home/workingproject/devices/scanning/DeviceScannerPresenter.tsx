import * as React from "react";
import { Button, Header, Icon, Loader, Modal, Segment, Table } from "semantic-ui-react";
import * as ApiClient from "../../../../../../../api/build/ApiClient";
import config from "../../../../../Config";

export class DeviceScannerPresenter extends React.Component<IDeviceScannerProps, undefined> {

    constructor(props: IDeviceScannerProps) {
        super(props);
    }

    public render() {

       return <div>
           <p>Click scan to begin scanning for devices</p>
           <br/>
           <Button primary loading={this.props.isScanning} onClick={this.props.scan}>Scan</Button>
           <Button onClick={this.props.cancelScan}>Cancel</Button>
           {
               (this.props.isScanning || this.props.devices.length) > 0 &&
               <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>IP Address</Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                            {
                                this.props.devices.map((d: ApiClient.DiscoveredDevice) => {
                                return <Table.Row key={d.ipAddress}>
                                        <Table.Cell>{d.name}</Table.Cell>
                                        <Table.Cell>{d.ipAddress}</Table.Cell>
                                        <Table.Cell><Button icon onClick={(e: any) => this.props.addDeviceToProject(d, this.props.projectId)}><Icon name="add" /></Button></Table.Cell>
                                    </Table.Row>;
                            })}
                    </Table.Body>
                </Table>
           }
            
        </div>;
    }
}

export interface IDeviceScannerProps {
    projectId?: number;
    isScanning?: boolean;
    devices?: ApiClient.DiscoveredDevice[];
    scan?: () => void;
    cancelScan?: () => void;
    addDeviceToProject?: (device: ApiClient.DiscoveredDevice, projectId: number) => void;
}
