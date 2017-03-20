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
           <Button primary loading={this.props.isScanning}>Scan</Button>
           <Button>Cancel</Button>
           {
               this.props.isScanning &&
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
                                return <Table.Row>
                                        <Table.Cell>{d.name}</Table.Cell>
                                        <Table.Cell>{d.ipAddress}</Table.Cell>
                                        <Table.Cell><Button icon><Icon name="add" /></Button></Table.Cell>
                                    </Table.Row>;
                            })}
                    </Table.Body>
                </Table>
           }
            
        </div>;
    }
}

export interface IDeviceScannerProps {
    isScanning?: boolean;
    devices?: ApiClient.DiscoveredDevice[];
    addDeviceToProject?: (device: ApiClient.DiscoveredDevice) => void;
}
