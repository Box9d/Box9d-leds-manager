import { connect } from "react-redux";
import { IAppState } from "../../AppState";
import * as OpenProjectActions from "./OpenProjectActions";
import * as OpenProjectPresenter from "./OpenProjectPresenter";

const mapStateToProps = (state: IAppState): OpenProjectPresenter.IOpenProjectProps => {
    return {
    };
};

const mapDispatchToProps = (dispatch: any): OpenProjectPresenter.IOpenProjectProps => {
    return {
        onModalOpened: () => dispatch(OpenProjectActions.FetchProjects(dispatch)),
    };
};

const OpenProject = connect(
    mapStateToProps,
    mapDispatchToProps,
)(OpenProjectPresenter.OpenProjectPresenter);

export default OpenProject;
