import * as React from "react";
import { Button, Header, Loader, Modal, Table } from "semantic-ui-react";
import * as ApiClient from "../../../../../../api/build/ApiClient";
import config from "../../../../Config";
import OpenProjectModal from "../../existingproject/OpenProjectModalContainer";

export class SelectVideoPresenter extends React.Component<ISelectVideoProps, undefined> {

    private fileBrowser: any;
    private form: any;

    constructor(props: ISelectVideoProps) {
        super(props);
    }

    public render() {

        let fileInputStyle = {
            display: "none",
        };

        return <div>
            {
                !this.props.hasVideo &&
                <p><em>No video selected</em></p>
            }
            {
                this.props.hasVideo &&
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

            <div>
            <form ref={(form: any) => {this.form = form; }} action={config.apiUrl + "/api/Video/StartVideoUpload"} method="post" encType="multipart/form-data">
                <input id="fileinput" type="file" name="fileInput" style={fileInputStyle} ref={(input: any) => { this.fileBrowser = input; }} onChange={this.submitFile}/>
            </form>
                <Button id="fileInputButton" primary onClick={this.openFileBrowser}>Browse for video...</Button>
            </div>
        </div>;
    }

    public componentDidMount() {
        this.props.fetchVideo(this.props.projectId);
    }

    public openFileBrowser = () => {
        this.fileBrowser.click();
    }

    public submitFile = () => {

        let fileName = this.fileBrowser.value
            .replace("c:\\fakepath\\", "")
            .replace("C:\\fakepath\\", "");

        this.props.onFileSelect(fileName, this.form, this.props.projectId);
    }
}

export interface ISelectVideoProps {
    projectId?: number;
    fetchVideo?: (projectId: number) => void;
    hasVideo?: boolean;
    videoMetadata?: ApiClient.VideoMetadataResponse;
    videoFilePath?: string;
    onFileSelect?: (fileName: string, fileUploadForm: any, projectId: number) => void;
}
