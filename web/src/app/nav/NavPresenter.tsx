import * as React from "react";
import { Container, Icon, Menu } from "semantic-ui-react";
import "./NavStyles.scss";

export class NavPresenter extends React.Component<INavProps, undefined> {
    public render() {
        return <Menu className="main-nav-menu" size="huge">
                <Container>
                    <Menu.Item className="borderless" name="Home" active={this.props.selectedNavItem === "home"} onClick={(e) => this.props.selectedNavItemOnChange("home")}>
                        <Icon name="home"/>
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
