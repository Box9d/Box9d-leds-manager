import * as React from "react";
import { Label } from "semantic-ui-react";
import * as ApiClient from "../../../api/build/ApiClient";
import config from "../Config";
import OpenProjectModal from "../containers/OpenProjectModalContainer";

// Use local state for fetching configuration status - ensures that the status is updated every time the component is rendered
export class VideoConfigurationStatusPresenter extends React.Component<IVideoConfigurationStatusProps, IVideoConfigurationStatusState> {

    constructor(props: IVideoConfigurationStatusProps) {
        super(props);

        this.state = {hasCheckedVideoConfigurationStatus: false};
    }

    public render() {
        if (!this.state.hasCheckedVideoConfigurationStatus) {
            return <Label color="grey">...</Label>;
        } else {
            if (this.state.videoIsConfigured) {
                return <Label color="green">video selected</Label>;
            } else {
                return <Label color="yellow">not configured</Label>;
            }
        }
    }

    public componentDidMount() {
        if (!this.state.hasCheckedVideoConfigurationStatus) {

            let apiClient = new ApiClient.VideoClient(config.apiUrl);
            apiClient.getProjectVideo(this.props.projectId).then((response: ApiClient.GlobalJsonResultOfVideoReference) => {
                if (response.successful) {
                    this.setState({
                        hasCheckedVideoConfigurationStatus: true,
                        videoIsConfigured: response.result != null,
                    });
                }
            });
        }
    }
}

export interface IVideoConfigurationStatusProps {
    projectId?: number;
}

export interface IVideoConfigurationStatusState {
    videoIsConfigured?: boolean;
    hasCheckedVideoConfigurationStatus?: boolean;
}
