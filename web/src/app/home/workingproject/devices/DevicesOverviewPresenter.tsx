import * as React from "react";
import { Button, Header, Icon, Loader, Modal, Segment, Table } from "semantic-ui-react";
import * as ApiClient from "../../../../../../api/build/ApiClient";
import config from "../../../../Config";
import DeviceScanner from "./scanning/DeviceScannerContainer";

export class DevicesOverviewPresenter extends React.Component<IDevicesOverviewProps, undefined> {

    constructor(props: IDevicesOverviewProps) {
        super(props);
    }

    public render() {

       return <div>
           {
               this.props.devices.length > 0 &&
               <div>
                <p>Existing devices for this project</p>
                <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>IP Address</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {
                            this.props.devices.map((d: ApiClient.Device) => {
                            return <Table.Row key={d.id}>
                                <Table.Cell>{d.name}</Table.Cell>
                                <Table.Cell>{d.ipAddress}</Table.Cell>
                                <Table.Cell><Button icon onClick={(e: any) => this.props.removeDeviceFromProject(d.id, this.props.projectId)}><Icon name="delete" /></Button></Table.Cell>
                            </Table.Row>;
                        })}
                    </Table.Body>
                </Table>
                </div>
           }
           {
               this.props.devices.length === 0 &&
               <p><em>Project does not yet have any devices</em></p>
           }

           <DeviceScanner/>
        </div>;
    }

    public componentDidMount() {
        this.props.fetchDevices(this.props.projectId);
    }
}

export interface IDevicesOverviewProps {
    removeDeviceFromProject?: (deviceId: number, projectId: number) => void;
    projectId?: number;
    devices?: ApiClient.Device[];
    fetchDevices?: (projectId: number) => void;
}
