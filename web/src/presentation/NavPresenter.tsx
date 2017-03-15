import * as React from "react";
import { Container, Menu } from "semantic-ui-react";

export class NavPresenter extends React.Component<INavProps, undefined> {
    public render() {
        return <Menu inverted size="huge">
                <Container>
                    <Menu.Item name="Home" active={this.props.selectedNavItem === "home"} onClick={(e) => this.props.selectedNavItemOnChange("home")}></Menu.Item>
                    <Menu.Item name="Projects" active={this.props.selectedNavItem === "projects"} onClick={(e) => this.props.selectedNavItemOnChange("projects")}></Menu.Item>
                    <Menu.Item name="Settings" active={this.props.selectedNavItem === "settings"} onClick={(e) => this.props.selectedNavItemOnChange("settings")}></Menu.Item>
                </Container>
            </Menu>;
    }
}

export interface INavProps {
    selectedNavItem?: string;
    selectedNavItemOnChange?: (selectedNavItem: string) => void;
}
