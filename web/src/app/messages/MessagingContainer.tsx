import { connect } from "react-redux";
import { IAppState } from "../AppState";
import * as MessagePresenter from "./MessagePresenter";

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
