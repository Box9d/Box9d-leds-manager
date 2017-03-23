import * as React from "react";
import { Button, Divider, Grid, Header, Icon, Item, Segment } from "semantic-ui-react";
import * as ApiClient from "../../../../../../api/build/ApiClient";
import config from "../../../../Config";
import DeviceConfiguration from "./configuration/DeviceConfigurationContainer";
import DeviceScanner from "./scanning/DeviceScannerContainer";

export class DevicesOverviewPresenter extends React.Component<IDevicesOverviewProps, IDevicesOverviewState> {

    constructor(props: IDevicesOverviewProps) {
        super(props);

        this.state = {selectedDeviceId: 0};
    }

    public render() {

       return <div>
           <DeviceScanner/>
           <Divider/>
           <br/>
           {
               this.props.devices.length > 0 &&
               <div>
                <p>Existing devices for this project</p>
                <Segment>
                    {
                        this.props.devices.map((d: ApiClient.Device) => {
                            return <Grid columns="equal" verticalAlign="middle" key={d.id}>
                                <Grid.Row>
                                    <Grid.Column width={12}>
                                        {d.name != null && d.name !== "" ? d.name : "unknown name" }{ " (" + d.ipAddress + ")"}
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Button floated="right" icon onClick={(e: any) => this.props.removeDeviceFromProject(d.id, this.props.projectId)}><Icon name="delete" /></Button>
                                        <Button floated="right" icon onClick={(e: any) => this.selectConfiguration(d.id)}><Icon name="settings" /></Button>
                                    </Grid.Column>
                                </Grid.Row>
                                {
                                    this.state.selectedDeviceId > 0 &&
                                    <Grid.Row>
                                        <Divider/>
                                        <DeviceConfiguration/>
                                    </Grid.Row>
                                }
                            </Grid>;
                        })
                    }
                </Segment>
            </div>
           }
           {
               this.props.devices.length === 0 &&
               <p><em>Project does not yet have any devices</em></p>
           }
        </div>;
    }

    public componentDidMount() {
        this.props.fetchDevices(this.props.projectId);
    }

    private selectConfiguration = (deviceId: number) => {
        this.props.fetchDeviceConfiguration(deviceId, this.props.projectId);
        this.setState({selectedDeviceId: deviceId});
    }
}

export interface IDevicesOverviewProps {
    fetchDeviceConfiguration?: (deviceId: number, projectId: number) => void;
    removeDeviceFromProject?: (deviceId: number, projectId: number) => void;
    projectId?: number;
    devices?: ApiClient.Device[];
    fetchDevices?: (projectId: number) => void;
}

export interface IDevicesOverviewState {
    selectedDeviceId: number;
}
