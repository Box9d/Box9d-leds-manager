import { connect } from "react-redux";
import * as OpenProjectActions from "../actions/OpenProjectActions";
import * as WorkingProjectActions from "../actions/WorkingProjectActions";
import * as OpenProjectModalPresenter from "../presentation/OpenProjectModalPresenter";
import { IAppState } from "../state/AppState";

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
