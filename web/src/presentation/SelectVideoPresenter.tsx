import * as React from "react";
import { Button, Header, Modal } from "semantic-ui-react";
import * as ApiClient from "../../../api/build/ApiClient";
import OpenProjectModal from "../containers/OpenProjectModalContainer";

export class SelectVideoPresenter extends React.Component<ISelectVideoProps, undefined> {

    public render() {
        return <div>
            <Header as="h4">Video</Header>
        </div>;
    }
}

export interface ISelectVideoProps {
    hasVideo?: boolean;
    hasCheckedForVideo?: boolean;
    checkForVideo?: () => void;
}
