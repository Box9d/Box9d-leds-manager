import { connect } from "react-redux";
import * as NewProjectFormActions from "../actions/NewProjectFormActions";
import * as NewProjectFormPresenter from "../presentation/NewProjectFormPresenter";
import { IAppState } from "../state/AppState";
import { NewProjectFormValidator } from "../validation/NewProjectFormValidator";

const mapStateToProps = (state: IAppState): NewProjectFormPresenter.INewProjectFormProps => {

    let validator = new NewProjectFormValidator();
    let nameValidation = validator.validateName(state.NewProjectFormState.Name);

    return {
        name: state.NewProjectFormState.Name,
        nameIsValid: nameValidation.isValid || state.NewProjectFormState.SubmitAttempts === 0,
        nameValidationMessage: state.NewProjectFormState.SubmitAttempts > 0 ? nameValidation.errorMessage : null,
    };
};

const mapDispatchToProps = (dispatch: any): NewProjectFormPresenter.INewProjectFormProps => {
    return {
        nameOnChange: (value: string) => dispatch(NewProjectFormActions.ChangeNewProjectName(value)),
        submit: (props: NewProjectFormPresenter.INewProjectFormProps) => dispatch(NewProjectFormActions.CreateProject(dispatch, props)),
    };
};

const NewProjectForm = connect(
    mapStateToProps,
    mapDispatchToProps,
)(NewProjectFormPresenter.NewProjectFormPresenter);

export default NewProjectForm;
