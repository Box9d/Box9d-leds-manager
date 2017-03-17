import * as React from "react";
import { Container, Icon, Menu } from "semantic-ui-react";

export class NavPresenter extends React.Component<INavProps, undefined> {
    public render() {
        return <Menu inverted size="huge">
                <Container>
                    <Menu.Item name="Home" active={this.props.selectedNavItem === "home"} onClick={(e) => this.props.selectedNavItemOnChange("home")}>
                        <Icon name="home"/>
                    </Menu.Item>
                    <Menu.Item name="Background Jobs" active={this.props.selectedNavItem === "backgroundjobs"} onClick={(e) => this.props.selectedNavItemOnChange("backgroundjobs")}>
                        <Icon name="tasks"/>
                    </Menu.Item>
                    <Menu.Item name="Settings" active={this.props.selectedNavItem === "settings"} onClick={(e) => this.props.selectedNavItemOnChange("settings")}>
                        <Icon name="wrench"/>
                    </Menu.Item>
                </Container>
            </Menu>;
    }
}

export interface INavProps {
    selectedNavItem?: string;
    selectedNavItemOnChange?: (selectedNavItem: string) => void;
}
