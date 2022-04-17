import React, { Component } from "react";
import axios from "axios";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      contact: null,
      email: null,
      password: null,
      patient: this.props.patient,
      account: this.props.account,
      loading: null,
      publicAddress: null,
    };
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "Application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    if (this.state.contact.length !== 10) {
      alert("Please enter a valid 10-digit contact number");
    } else if (this.state.password.length < 8) {
      alert("Password should be at least 8 characters long");
    } else if (!/^0x[a-fA-F0-9]{40}$/.test(this.state.publicAddress)) {
      alert("Please enter a valid public address");
      //return;
    } else {
      const body = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        mobile: this.state.contact,
        publicAddress: this.state.publicAddress,
      };
      axios
        .post("http://localhost:8000/user/signup", body, config)
        .then((res) => {
          // console.log(res);
          if (res.status === 200) {
            sessionStorage.setItem("isLoggedIn", "true");
            window.location.assign("/");
            this.addPatients();
          }
        });
      // .catch((err) => {
      //   alert(err);
      // });
    }
  };

  addPatients() {
    console.log("final", this.state);
    this.setState({ loading: true });
    this.state.patient.methods
      //this.state.patient
      .addPatient(
        this.state.account,
        this.state.name,
        this.state.contact,
        this.state.email
      )
      .send({ from: this.state.account })
      .once("receipt", (receipt) => {
        console.log(receipt);
        this.setState({ loading: false });
        //window.location.assign("/");
      });
  }

  render() {
    return (
      <div className="container">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h4 style={{ fontSize: "40px", width: "70%" }}>
            Please share a few details to get you started...
          </h4>
          <form onSubmit={(e) => this.handleSubmit(e)} style={{ width: "70%" }}>
            <label htmlFor="name" style={{ fontSize: "20px" }}>
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Please enter your name"
              name="name"
              className="inputBox"
              value={this.state.name}
              onChange={(e) => this.handleInputChange(e)}
              required
            />
            <br></br>
            <label htmlFor="contact" style={{ fontSize: "20px" }}>
              Contact
            </label>
            <input
              type="tel"
              id="contact"
              name="contact"
              placeholder="Please enter your contact number"
              className="inputBox"
              value={this.state.contact}
              onChange={(e) => this.handleInputChange(e)}
              required
            />
            <br></br>
            <label htmlFor="email" style={{ fontSize: "20px" }}>
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Please enter your email id"
              className="inputBox"
              name="email"
              value={this.state.email}
              onChange={(e) => this.handleInputChange(e)}
              required
            />
            <br></br>
            <label htmlFor="password" style={{ fontSize: "20px" }}>
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Please enter your password"
              name="password"
              className="inputBox"
              value={this.state.password}
              onChange={(e) => this.handleInputChange(e)}
              required
            />
            <br></br>
            <label htmlFor="publicAddress" style={{ fontSize: "20px" }}>
              Account Address
            </label>
            <input
              type="text"
              id="publicAddress"
              placeholder="Please enter your public address"
              name="publicAddress"
              className="inputBox"
              value={this.state.publicAddress}
              onChange={(e) => this.handleInputChange(e)}
              required
            />
            <br></br>
            <br></br>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <button className="btn teal darken-3" type="submit" name="action">
                Create Account
                <i className="material-icons right">person_add</i>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Signup;
