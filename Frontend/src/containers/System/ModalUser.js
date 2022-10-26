import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../utils/emitter";

class ModalUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            address: "",
            phoneNumber: "",
        };
        this.listenEmitter();
    }

    listenEmitter() {
        emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
            this.setState({
                email: "",
                password: "",
                firstName: "",
                lastName: "",
                address: "",
                phoneNumber: "",
            });
        });
    }

    componentDidMount() {}

    toggle = () => {
        this.props.toggleModalUser();
    };

    handleOnchangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState,
        });
    };

    checkValidateInput = () => {
        let isValidate = true;
        let arrInput = [
            "email",
            "password",
            "firstName",
            "lastName",
            "address",
            "phoneNumber",
        ];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValidate = false;
                alert("please enter the value " + [arrInput[i]]);
                break;
            }
        }
        return isValidate;
    };

    handleCreateNewUser = () => {
        let isValidate = this.checkValidateInput();
        if (isValidate === true) {
            this.props.createNewUser(this.state);
        }
    };

    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => {
                    this.toggle();
                }}
                className={"modal-user-container"}
                size="lg"
            >
                <ModalHeader
                    toggle={() => {
                        this.toggle();
                    }}
                >
                    Create new user
                </ModalHeader>
                <ModalBody>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>Email</label>
                            <input
                                type="text"
                                onChange={(event) => {
                                    this.handleOnchangeInput(event, "email");
                                }}
                                value={this.state.email}
                            />
                        </div>
                        <div className="input-container">
                            <label>Password</label>
                            <input
                                type="password"
                                onChange={(event) => {
                                    this.handleOnchangeInput(event, "password");
                                }}
                                value={this.state.password}
                            />
                        </div>
                        <div className="input-container">
                            <label>First Name</label>
                            <input
                                type="text"
                                onChange={(event) => {
                                    this.handleOnchangeInput(
                                        event,
                                        "firstName"
                                    );
                                }}
                                value={this.state.firstName}
                            />
                        </div>
                        <div className="input-container">
                            <label>Last Name</label>
                            <input
                                type="text"
                                onChange={(event) => {
                                    this.handleOnchangeInput(event, "lastName");
                                }}
                                value={this.state.lastName}
                            />
                        </div>
                        <div className="input-container">
                            <label>Address</label>
                            <input
                                type="text"
                                onChange={(event) => {
                                    this.handleOnchangeInput(event, "address");
                                }}
                                value={this.state.address}
                            />
                        </div>
                        <div className="input-container">
                            <label>Phone Number</label>
                            <input
                                type="text"
                                onChange={(event) => {
                                    this.handleOnchangeInput(
                                        event,
                                        "phoneNumber"
                                    );
                                }}
                                value={this.state.phoneNumber}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => {
                            this.handleCreateNewUser();
                        }}
                        className="px-3"
                    >
                        Create new
                    </Button>

                    <Button
                        color="secondary"
                        onClick={() => {
                            this.toggle();
                        }}
                        className="px-3"
                    >
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
