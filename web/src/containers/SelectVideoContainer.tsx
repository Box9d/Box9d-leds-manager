import { connect } from "react-redux";
import * as WorkingProjectActions from "../actions/WorkingProjectActions";
import * as SelectVideoPresenter from "../presentation/SelectVideoPresenter";
import { IAppState } from "../state/AppState";

const mapStateToProps = (state: IAppState): SelectVideoPresenter.ISelectVideoProps => {
    return {
    };
};

const mapDispatchToProps = (dispatch: any): SelectVideoPresenter.ISelectVideoProps => {
    return {
    };
};

const SelectVideo = connect(
    mapStateToProps,
    mapDispatchToProps,
)(SelectVideoPresenter.SelectVideoPresenter);

export default SelectVideo;
