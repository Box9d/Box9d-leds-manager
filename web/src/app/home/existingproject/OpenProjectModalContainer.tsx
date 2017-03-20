import { connect } from "react-redux";
import { IAppState } from "../../AppState";
import * as WorkingProjectActions from "../workingproject/WorkingProjectActions";
import * as OpenProjectActions from "./OpenProjectActions";
import * as OpenProjectModalPresenter from "./OpenProjectModalPresenter";

const mapStateToProps = (state: IAppState): OpenProjectModalPresenter.IOpenProjectModalProps => {
    return {
        modalIsOpen: state.OpenProjectState.ModalIsOpen,
        projects: state.OpenProjectState.Projects,
    };
};

const mapDispatchToProps = (dispatch: any): OpenProjectModalPresenter.IOpenProjectModalProps => {
    return {
        onModalClose: () => dispatch(OpenProjectActions.CloseModal()),
        selectProjectOnClick: (projectId: number) => {
            dispatch(WorkingProjectActions.SetWorkingProject(dispatch, projectId));
            dispatch(OpenProjectActions.CloseModal());
        },
    };
};

const OpenProjectModal = connect(
    mapStateToProps,
    mapDispatchToProps,
)(OpenProjectModalPresenter.OpenProjectModalPresenter);

export default OpenProjectModal;
