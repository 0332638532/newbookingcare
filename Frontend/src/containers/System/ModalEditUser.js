import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import _ from "lodash";

class ModalEditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            address: "",
            // phoneNumber: "",
        };
    }

    componentDidMount() {
        let user = this.props.currentUser;
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                password: "hashCode",
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
            });
        }
    }

    toggle = () => {
        this.props.toggleModalEditUser();
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
            // "phoneNumber",
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

    handleUpdateUser = () => {
        let isValidate = this.checkValidateInput();
        if (isValidate === true) {
            this.props.editUser(this.state);
        }
    };

    render() {
        console.log(this.props);
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
                    Edit user
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
                                disabled
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
                                disabled
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
                        <div className="input-container input-address">
                            <label>Address</label>
                            <input
                                type="text"
                                onChange={(event) => {
                                    this.handleOnchangeInput(event, "address");
                                }}
                                value={this.state.address}
                            />
                        </div>
                        {/* <div className="input-container">
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
                        </div> */}
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => {
                            this.handleUpdateUser();
                        }}
                        className="px-3"
                    >
                        Save changes
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
