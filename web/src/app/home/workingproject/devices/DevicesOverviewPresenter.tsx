import * as React from "react";
import { Button, Divider, Grid, Header, Icon, Item, Segment } from "semantic-ui-react";
import * as ApiClient from "../../../../../../api/build/ApiClient";
import config from "../../../../Config";
import DeviceConfiguration from "./configuration/DeviceConfigurationContainer";
import DeviceScanner from "./scanning/DeviceScannerContainer";
import { DeviceWithStatus } from "./DevicesOverviewState";

export class DevicesOverviewPresenter extends React.Component<IDevicesOverviewProps, IDevicesOverviewState> {

    constructor(props: IDevicesOverviewProps) {
        super(props);

        this.state = { selectedDeviceId: 0 };
    }

    public render() {

        return <div>
            <Divider horizontal>Devices</Divider>
            <DeviceScanner />
            <Divider />
            <br />
            {
                this.props.devices.length > 0 &&
                <div>
                    <p>Existing devices for this project</p>
                    <Segment>
                        {
                            this.props.devices.map((d: DeviceWithStatus) => {
                                return <Grid columns="equal" verticalAlign="middle" key={d.Device.id}>
                                    <Grid.Row>
                                        <Grid.Column width={12}>
                                            {d.Device.name != null && d.Device.name !== "" ? d.Device.name : "unknown name"}{" (" + d.Device.ipAddress + ")"}
                                        </Grid.Column>
                                        <Grid.Column>
                                            <Button floated="right" icon onClick={(e: any) => this.props.removeDeviceFromProject(d.Device.id, this.props.projectId)}><Icon name="delete" /></Button>
                                            <Button floated="right" icon onClick={(e: any) => this.selectConfiguration(d.Device.id)}><Icon name={this.state.selectedDeviceId === d.Device.id ? "minimize" : "settings"} /></Button>
                                        </Grid.Column>
                                    </Grid.Row>
                                    {
                                        this.state.selectedDeviceId > 0 &&
                                        <Grid.Row>
                                            <Grid.Column>
                                                <DeviceConfiguration />
                                            </Grid.Column>
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

        if (deviceId === this.state.selectedDeviceId) {
            // Clicking the configuration button a second time, should collapse and clear the device config
            this.props.clearDeviceConfiguration();
            this.setState({ selectedDeviceId: 0 });
        } else {
            // Clicking for the first time should expand and fetch the device config
            this.props.fetchDeviceConfiguration(deviceId, this.props.projectId);
            this.setState({ selectedDeviceId: deviceId });
        }
    }
}

export interface IDevicesOverviewProps {
    clearDeviceConfiguration?: () => void;
    fetchDeviceConfiguration?: (deviceId: number, projectId: number) => void;
    removeDeviceFromProject?: (deviceId: number, projectId: number) => void;
    projectId?: number;
    devices?: DeviceWithStatus[];
    fetchDevices?: (projectId: number) => void;
}

export interface IDevicesOverviewState {
    selectedDeviceId: number;
}
