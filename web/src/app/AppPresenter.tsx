import * as React from "react";
import { Container, Grid, Icon, Menu, Segment, Sidebar } from "semantic-ui-react";
import "./AppStyles.scss";
import BackgroundJobs from "./BackgroundJobs/BackgroundJobsContainer";
import Home from "./home/HomeContainer";
import Messaging from "./messages/MessagingContainer";
import Nav from "./nav/NavContainer";
import Settings from "./settings/SettingsContainer";

export class AppPresenter extends React.Component<IAppProps, undefined> {
    public render() {
        return <div>
                <Nav/>
                <Container>
                    <Messaging/>
                    <br/>
                    <Home/>
                    <BackgroundJobs/>
                    <Settings/>
                </Container>
         </div>;
    }
}

export interface IAppProps {
}
