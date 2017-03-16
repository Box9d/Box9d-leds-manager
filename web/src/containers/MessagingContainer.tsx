import { connect } from "react-redux";
import * as NavActions from "../actions/NavActions";
import * as MessagePresenter from "../presentation/MessagePresenter";
import { IAppState } from "../state/AppState";

const mapStateToProps = (state: IAppState): MessagePresenter.IMessageProps => {
    return {
        state: state.MessageState,
    };
};

const mapDispatchToProps = (dispatch: any): MessagePresenter.IMessageProps => {
    return {
    };
};

const Messaging = connect(
    mapStateToProps,
    mapDispatchToProps,
)(MessagePresenter.MessagePresenter);

export default Messaging;
