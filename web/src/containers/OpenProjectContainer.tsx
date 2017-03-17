import { connect } from "react-redux";
import * as OpenProjectActions from "../actions/OpenProjectActions";
import * as OpenProjectPresenter from "../presentation/OpenProjectPresenter";
import { IAppState } from "../state/AppState";

const mapStateToProps = (state: IAppState): OpenProjectPresenter.IOpenProjectProps => {
    return {
        modalIsOpen: state.OpenProjectState.ModalIsOpen,
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
