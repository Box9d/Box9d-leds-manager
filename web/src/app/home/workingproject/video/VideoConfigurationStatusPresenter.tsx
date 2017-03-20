import * as React from "react";
import { Label } from "semantic-ui-react";
import * as ApiClient from "../../../../../../api/build/ApiClient";
import config from "../../../../Config";
import OpenProjectModal from "../../existingproject/OpenProjectModalContainer";

// Use local state for fetching configuration status - ensures that the status is updated every time the component is rendered
export class VideoConfigurationStatusPresenter extends React.Component<IVideoConfigurationStatusProps, undefined> {

    constructor(props: IVideoConfigurationStatusProps) {
        super(props);
    }

    public render() {
        if (!this.props.hasCheckedVideoConfigurationStatus) {
            return <Label color="grey">...</Label>;
        } else {
            if (this.props.videoIsConfigured) {
                return <Label color="green">OK</Label>;
            } else {
                return <Label color="yellow">Not configured</Label>;
            }
        }
    }

    public componentDidMount() {
        if (!this.props.hasCheckedVideoConfigurationStatus) {
            this.props.checkVideoConfigurationStatus(this.props.projectId);
        }
    }
}

export interface IVideoConfigurationStatusProps {
    projectId?: number;
    videoIsConfigured?: boolean;
    checkVideoConfigurationStatus?: (projectId: number) => void;
    hasCheckedVideoConfigurationStatus?: boolean;
}
