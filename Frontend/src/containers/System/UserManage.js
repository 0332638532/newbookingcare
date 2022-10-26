import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import {
    getAllUser,
    createNewUserService,
    deleteUserService,
    editUserService,
} from "../../services/userService";
import ModalUser from "./ModalUser";
import ModalEditUser from "./ModalEditUser";
import { emitter } from "../../utils/emitter";

class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModal: false,
            isOpenEditUser: false,
            userEdit: {},
        };
    }

    async componentDidMount() {
        await this.getAllUser();
    }

    getAllUser = async () => {
        let response = await getAllUser("All");
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users,
            });
        }
    };

    handleCreateNewUser = () => {
        this.setState({
            isOpenModal: true,
        });
    };

    toggleModalUser = () => {
        this.setState({
            isOpenModal: !this.state.isOpenModal,
        });
    };

    toggleModalEditUser = () => {
        this.setState({
            isOpenEditUser: !this.state.isOpenEditUser,
        });
    };

    createNewUser = async (data) => {
        try {
            let response = await createNewUserService(data);
            if (response && response.errCode !== 0) {
                alert(response.errMessage);
            } else {
                await this.getAllUser();
                this.setState({
                    isOpenModal: false,
                });
                emitter.emit("EVENT_CLEAR_MODAL_DATA");
            }
        } catch (e) {
            console.log(e);
        }
    };

    handleEditUser = (user) => {
        this.setState({
            isOpenEditUser: true,
            userEdit: user,
        });
    };

    editUser = async (user) => {
        try {
            let res = await editUserService(user);
            if (res && res.errCode === 0) {
                this.setState({
                    isOpenEditUser: false,
                });
                await this.getAllUser();
            } else {
                alert(res.errCode);
            }
        } catch (e) {
            console.log(e);
        }
    };

    handleDeleteUser = async (user) => {
        try {
            let res = await deleteUserService(user.id);
            if (res && res.errCode === 0) {
                await this.getAllUser();
            } else {
                alert(res.errMessage);
            }
        } catch (e) {
            console.log(e);
        }
    };

    render() {
        let arrUsers = this.state.arrUsers;
        return (
            <div className="user-container">
                <ModalUser
                    isOpen={this.state.isOpenModal}
                    toggleModalUser={this.toggleModalUser}
                    createNewUser={this.createNewUser}
                />
                {this.state.isOpenEditUser && (
                    <ModalEditUser
                        isOpen={this.state.isOpenEditUser}
                        toggleModalEditUser={this.toggleModalEditUser}
                        currentUser={this.state.userEdit}
                        editUser={this.editUser}
                    />
                )}

                <div className="title text-center">Manage User</div>
                <div className="mx-3">
                    <button
                        className="btn btn-primary px-3"
                        onClick={() => this.handleCreateNewUser()}
                    >
                        <i className="fas fa-plus "></i>
                        Create new user
                    </button>
                </div>
                <div className="user-table mt-4 mx-3">
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Address</th>
                                {/* <th>Phone Number</th> */}
                                <th>Action</th>
                            </tr>

                            {arrUsers &&
                                arrUsers.map((item, index) => {
                                    return (
                                        <tr>
                                            <td>{item.email}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>
                                            {/* <td>{item.phonenumber}</td> */}
                                            <td>
                                                <button
                                                    className="btn-edit"
                                                    onClick={() =>
                                                        this.handleEditUser(
                                                            item
                                                        )
                                                    }
                                                >
                                                    <i class="fas fa-pencil-alt"></i>
                                                </button>
                                                <button
                                                    className="btn-delete"
                                                    onClick={() =>
                                                        this.handleDeleteUser(
                                                            item
                                                        )
                                                    }
                                                >
                                                    <i class="fas fa-trash-alt"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
