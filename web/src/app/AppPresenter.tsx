import * as React from "react";
import { Container, Grid, Icon, Menu, Segment, Sidebar } from "semantic-ui-react";
import BackgroundJobs from "./BackgroundJobs/BackgroundJobsContainer";
import Home from "./home/HomeContainer";
import Messaging from "./messages/MessagingContainer";
import Nav from "./nav/NavContainer";
import Settings from "./settings/SettingsContainer";
import "./AppStyles.scss"

export class AppPresenter extends React.Component<IAppProps, undefined> {
    public render() {
        return <div>
            <Nav />
            <Container>
                {
                    this.props.selectedNavItem === "home" &&
                    <Home />
                }
                {
                    this.props.selectedNavItem === "backgroundjobs" &&
                    <BackgroundJobs />
                }
                {
                    this.props.selectedNavItem === "settings" &&
                    <Settings />
                }
            </Container>
            <Messaging />
        </div>;
    }
}

export interface IAppProps {
    selectedNavItem?: string;
}
