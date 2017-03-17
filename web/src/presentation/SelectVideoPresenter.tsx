import * as React from "react";
import { Button, Header, Loader, Modal, Table } from "semantic-ui-react";
import * as ApiClient from "../../../api/build/ApiClient";
import config from "../Config";
import OpenProjectModal from "../containers/OpenProjectModalContainer";

export class SelectVideoPresenter extends React.Component<ISelectVideoProps, undefined> {

    private fileBrowser: any;

    constructor(props: ISelectVideoProps) {
        super(props);
    }

    public render() {

        if (!this.props.hasCheckedVideoState) {
            this.props.fetchVideo(this.props.projectId);
        }

        let fileInputStyle = {
            display: "none",
        };

        return <div>
            {
                !this.props.hasCheckedVideoState &&
                <Loader inline="centered"/>
            }
            {
                this.props.hasCheckedVideoState && !this.props.hasVideo &&
                <p><em>No video selected</em></p>
            }
            {
                this.props.hasCheckedVideoState && this.props.hasVideo &&
                // todo: display table
                <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>File path</Table.HeaderCell>
                            <Table.HeaderCell>Frame rate</Table.HeaderCell>
                            <Table.HeaderCell>Total frames</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>{this.props.videoFilePath}</Table.Cell>
                            <Table.Cell>{this.props.videoMetadata.frameRate.toFixed(2)}</Table.Cell>
                            <Table.Cell>{this.props.videoMetadata.frameCount}</Table.Cell>
                            <Table.Cell></Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            }
            {
                this.props.hasCheckedVideoState &&
                <div>
                <input id="fileinput" type="file" style={fileInputStyle} ref={(input: any) => { this.fileBrowser = input; }} onChange={this.submitFile}/>
                    <Button id="fileInputButton" primary onClick={this.openFileBrowser}>Browse for video...</Button>
                </div>
            }
        </div>;
    }

    public openFileBrowser = () => {
        this.fileBrowser.click();
    }

    public submitFile = () => {
        this.props.onFileSelect(this.props.projectId, this.fileBrowser.value);
    }
}

export interface ISelectVideoProps {
    projectId?: number;
    hasCheckedVideoState?: boolean;
    fetchVideo?: (projectId: number) => void;
    hasVideo?: boolean;
    videoMetadata?: ApiClient.VideoMetadataResponse;
    videoFilePath?: string;
    onFileSelect?: (projectId: number, filePath: string) => void;
}
