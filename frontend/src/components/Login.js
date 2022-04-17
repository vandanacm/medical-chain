import React, { Component } from "react";
import Web3 from "web3";
import Patient from "../build/Patient.json";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      contact: null,
      email: null,
      password: null,
      publicAddress: null,
      patient: null,
      account: null,
    };
  }

  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockChain();
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  async loadBlockChain() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
    const networkId = await web3.eth.net.getId();
    //const networkData = Patient.networks[networkId]
    const networkData = Patient.networks["5777"];
    if (networkData) {
      const patient = new web3.eth.Contract(Patient.abi, networkData.address);
      this.setState({ patient });
    } else {
      console.log(networkId);
      //window.alert('Patient contract not deployed to detected network.')
      window.alert(networkId);
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    // for await (const file of ipfs.add(globSource("./uploads/" + fileName))) {
    //   console.log(file);
    // }
    const config = {
      headers: {
        "Content-Type": "Application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    if (!/^0x[a-fA-F0-9]{40}$/.test(this.state.publicAddress)) {
      alert("Please enter a valid public address");
      //return;
    } else {
      const body = {
        email: this.state.email,
        password: this.state.password,
        publicAddress: this.state.publicAddress,
      };
      axios
        .post("http://localhost:8000/user/login", body, config)
        .then((res) => {
          // console.log(res);
          if (res.status === 200) {
            sessionStorage.setItem("isLoggedIn", "true");
            window.location.assign("/");
            this.addCandidates();
          }
        });
      // .catch((err) => {
      //   console.log(err);
      // });
    }
  };

  addCandidates() {
    console.log(this.state);
    this.setState({ loading: true });
    this.state.patient.methods
      .addCandidate(
        this.state.candidate_name,
        this.state.candidate_details,
        this.state.id
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
            Please enter your credentials to login...
          </h4>
          <form onSubmit={this.handleSubmit} style={{ width: "70%" }}>
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
                Login
                <i className="material-icons right">person_add</i>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
