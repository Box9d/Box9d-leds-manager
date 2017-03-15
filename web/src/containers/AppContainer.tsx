import { connect } from "react-redux";
import * as AppPresenter from "../presentation/AppPresenter";
import { IAppState } from "../state/AppState";

const mapStateToProps = (state: IAppState): AppPresenter.IAppProps => {
    return {
    };
};

const mapDispatchToProps = (dispatch: any): AppPresenter.IAppProps => {
    return {
    };
};

const App = connect(
    mapStateToProps,
    mapDispatchToProps,
)(AppPresenter.AppPresenter);

export default App;
