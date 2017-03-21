import * as React from "react";
import { Label } from "semantic-ui-react";
import * as ApiClient from "../../../../../../api/build/ApiClient";
import config from "../../../../Config";
import OpenProjectModal from "../../existingproject/OpenProjectModalContainer";

export class DevicesConfigurationStatusPresenter extends React.Component<IDevicesConfigurationStatusProps, undefined> {

    constructor(props: IDevicesConfigurationStatusProps) {
        super(props);
    }

    public render() {
        return <Label color="blue">{this.props.numberOfDevices}</Label>;
    }

    public componentDidMount() {
        this.props.checkDevicesConfigurationStatus(this.props.projectId);
    }
}

export interface IDevicesConfigurationStatusProps {
    projectId?: number;
    numberOfDevices?: number;
    checkDevicesConfigurationStatus?: (projectId: number) => void;
}
