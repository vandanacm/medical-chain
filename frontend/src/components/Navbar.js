import React, { Component } from "react";
import { NavLink, withRouter, Link } from "react-router-dom";
//import Identicon from './identicon';
import logo from "../assets/logo.jpg";
import "../styles/navbar.css";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "",
      // identicon: null,
      loading: true,
      account: this.props.account,
      showOptions: false,
    };
    this.signupHandler = this.signupHandler.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  signupHandler() {
    window.location.href = "/signup";
  }

  loginHandler() {
    window.location.href = "/login";
  }

  handleClick() {
    this.setState((currentState) => ({
      showOptions: !currentState.showOptions,
    }));
  }

  render() {
    if (
      this.props.location.pathname === "/" ||
      this.props.location.pathname === "/signup" ||
      this.props.location.pathname === "/login"
    ) {
      return (
        <nav className="nav-wrapper teal darken-3">
          <div className="container">
            <a href="#" className="brand-logo center">
              {/* <i style={{ marginTop: 5 }} className="material-icons">
                local_hospital
              </i> */}
              Medical Chain
            </a>

            <ul
              className="right hide-on-med-and-down"
              style={{
                display: "flex",
                justifyContent: "center",
                height: "63px",
                alignItems: "center",
              }}
            >
              <li>
                {this.props.account ? (
                  <img
                    style={{ marginTop: 22, marginLeft: 15 }}
                    className="v-align center"
                    id="icon"
                    width="60"
                    // height="30"
                    src={logo}
                    alt=""
                    //src={`data:image/png;base64,${new Identicon(this.state.account, 30).toString()}`}
                  />
                ) : (
                  <span></span>
                )}
              </li>
              <li>
                {/* {sessionStorage.getItem("isLoggedIn") === "true" ? (
                  ""
                ) : ( */}
                <p
                  style={{ marginLeft: "50px", cursor: "pointer" }}
                  onClick={() => this.signupHandler()}
                >
                  Signup
                </p>
                {/* )} */}
              </li>
              <li>
                {/* {sessionstorage.getItem("isLoggedIn") === "true" ? (
                  ""
                ) : ( */}
                <p
                  style={{ marginLeft: "10px", cursor: "pointer" }}
                  onClick={() => this.loginHandler()}
                >
                  Login
                </p>
                {/* )} */}
              </li>
              <li
                style={{ cursor: "pointer" }}
                class="collection-header1"
                // onClick={() => {
                //   this.handleClick();
                // }}
              >
                <h6>
                  <b>
                    <i
                      style={{ marginLeft: 25, marginBottom: 10 }}
                      className="material-icons"
                    >
                      menu
                    </i>
                  </b>
                </h6>
                <div className="collection-list">
                  <a className="collection-item">
                    <Link
                      to="/upload"
                      style={{
                        display: "flex",
                        justifyContent: "left",
                        alignItems: "center",
                        color: "black",
                      }}
                    >
                      <i className="material-icons" style={{ marginRight: 15 }}>
                        cloud_upload
                      </i>
                      <div>Upload a medical report</div>
                    </Link>
                  </a>
                  <a class="collection-item">
                    <Link
                      to="/view"
                      style={{
                        display: "flex",
                        justifyContent: "left",
                        alignItems: "center",
                        color: "black",
                      }}
                    >
                      <i className="material-icons" style={{ marginRight: 15 }}>
                        insert_drive_file
                      </i>
                      View your uploaded medical reports
                    </Link>
                  </a>
                  <a class="collection-item">
                    <Link
                      to="/doctors"
                      style={{
                        display: "flex",
                        justifyContent: "left",
                        alignItems: "center",
                        color: "black",
                      }}
                    >
                      <i className="material-icons" style={{ marginRight: 15 }}>
                        person_add
                      </i>
                      View/Add a trusted doctor
                    </Link>
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      );
    } else {
      return (
        <nav className="nav-wrapper teal darken-3">
          <div className="container">
            <a href="#" className="brand-logo">
              Medical Chain
            </a>
            <ul className="right hide-on-med-and-down">
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/upload">Upload</NavLink>
              </li>
              <li>
                <NavLink to="/view">View</NavLink>
              </li>
              <li>
                <NavLink to="/doctors">Doctors</NavLink>
              </li>
              <li>
                {this.props.account ? (
                  <img
                    style={{ marginTop: 6, marginLeft: 15 }}
                    className="v-align center"
                    id="icon"
                    width="50"
                    // height="30"
                    src={logo}
                    alt=""
                    // src={`data:image/png;base64,${new Identicon(this.state.account, 30).toString()}`}
                  />
                ) : (
                  <span></span>
                )}
              </li>
            </ul>
          </div>
        </nav>
      );
    }
  }
}

export default withRouter(Navbar);
