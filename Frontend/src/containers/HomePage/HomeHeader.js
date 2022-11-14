import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { FormattedMessage } from "react-intl";

class HomeHeader extends Component {
    render() {
        return (
            <>
                {/* header container */}
                <div className="home-header-container">
                    <div className="home-header-content">
                        <div className="left-content">
                            <i className="fa fa-bars"></i>
                            <div className="logo-content"></div>
                        </div>
                        <div className="center-content">
                            <div className="child-content">
                                <b>
                                    <FormattedMessage id="homeheader.specialist" />
                                </b>
                                <div className="subs-title">
                                    <FormattedMessage id="homeheader.finddoctor" />
                                </div>
                            </div>
                            <div className="child-content">
                                <b>
                                    <FormattedMessage id="homeheader.healthfacilities" />
                                </b>
                                <div className="subs-title">
                                    <FormattedMessage id="homeheader.chooseroom" />
                                </div>
                            </div>
                            <div className="child-content">
                                <b>
                                    <FormattedMessage id="homeheader.doctor" />
                                </b>
                                <div className="subs-title">
                                    <FormattedMessage id="homeheader.choosedoctor" />
                                </div>
                            </div>
                            <div className="child-content">
                                <b>
                                    <FormattedMessage id="homeheader.examinationpackage" />
                                </b>
                                <div className="subs-title">
                                    <FormattedMessage id="homeheader.generalexamination" />
                                </div>
                            </div>
                        </div>
                        <div className="right-content">
                            <div className="support">
                                <i className="fas fa-question-circle"></i>
                                <FormattedMessage id="homeheader.support" />
                            </div>
                            <div className="flag">VN</div>
                            <div className="flag">EN</div>
                        </div>
                    </div>
                </div>

                {/* Banner */}
                <div className="home-header-banner">
                    <div className="content-up">
                        <div className="title1">
                            <FormattedMessage id="banner.medicalcommunication" />
                        </div>
                        <div className="title2">
                            <b>
                                <FormattedMessage id="banner.healthcare" />
                            </b>
                        </div>
                        <div className="search">
                            <i className="fas fa-search"></i>
                            <input type="text" />
                        </div>
                    </div>
                    <div className="content-down">
                        <div className="options">
                            <div className="option-child">
                                <div className="icon-child">
                                    <i className="far fa-hospital"></i>
                                </div>
                                <div className="text-child">
                                    <FormattedMessage id="banner.title1" />
                                </div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child">
                                    <i className="fas fa-mobile-alt"></i>
                                </div>
                                <div className="text-child">
                                    <FormattedMessage id="banner.title2" />
                                </div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child">
                                    <i className="fas fa-book"></i>
                                </div>
                                <div className="text-child">
                                    <FormattedMessage id="banner.title3" />
                                </div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child">
                                    <i className="fas fa-flask"></i>
                                </div>
                                <div className="text-child">
                                    <FormattedMessage id="banner.title4" />
                                </div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child">
                                    <i className="fas fa-user-md"></i>
                                </div>
                                <div className="text-child">
                                    <FormattedMessage id="banner.title5" />
                                </div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child">
                                    <i className="fas fa-briefcase-medical"></i>
                                </div>
                                <div className="text-child">
                                    <FormattedMessage id="banner.title6" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
