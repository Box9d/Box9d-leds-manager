import * as React from "react";
import { Container, Grid, Icon, Menu, Segment, Sidebar } from "semantic-ui-react";
import BackgroundJobs from "../containers/BackgroundJobsContainer";
import Home from "../containers/HomeContainer";
import Messaging from "../containers/MessagingContainer";
import Nav from "../containers/NavContainer";

export class AppPresenter extends React.Component<IAppProps, undefined> {
    public render() {
        return <div>
                <Nav/>
                <Container>
                    <Messaging/>
                    <br/>
                    <Home/>
                </Container>
            <Container>
                <BackgroundJobs/>
            </Container>
         </div>;
    }
}

export interface IAppProps {
}
