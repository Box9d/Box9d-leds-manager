import * as React from "react";
import { Container, Menu } from "semantic-ui-react";
import BackgroundJobs from "../containers/BackgroundJobsContainer";
import Nav from "../containers/NavContainer";

export class AppPresenter extends React.Component<IAppProps, undefined> {
    public render() {
        return <div>
            <Nav/>
            <Container>
                <BackgroundJobs/>
            </Container>
         </div>;
    }
}

export interface IAppProps {
}
