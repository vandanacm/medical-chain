import React, { Component } from "react";

export default class ReportUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: null,
      age: null,
      accessionNumber: null,
      buffer: null,
      patient: this.props.patient,
      account: this.props.account,
      fhash: null,
      selectedFile: null,
      selectedImage: null,
    };
  }

  captureFile = (e) => {
    e.preventDefault();
    this.setState({
      selectedFile: e.target.files[0],
    });
  };

  captureImage = (e) => {
    e.preventDefault();
    this.setState({
      selectedImage: e.target.files[0],
    });
  };

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    console.log("here");
    var temp = this;
    e.preventDefault();
    const data = new FormData();
    data.append("file", this.state.selectedFile);
    data.append("image", this.state.selectedImage);
    axios
      .post("http://localhost:5000/reportUpload", data, {})
      .then(function (response) {
        console.log(response.data);
        temp.setState({ fhash: response.data });
        // temp.addFileToPatient();
      });
  };

  addFileToPatient() {
    console.log(this.state);
    this.setState({ loading: true });
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();
    today = dd + "/" + mm + "/" + yyyy;
    this.state.patient.methods
      .saveFile(this.state.fname, this.state.fhash, today)
      .send({ from: this.state.account })
      .once("receipt", (receipt) => {
        console.log(receipt);
        this.setState({ loading: false });
      });
  }

  render() {
    return (
      <div className="container">
        <div
          style={{
            display: "flex",
            width: "100%",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h4
            htmlFor="file"
            style={{ fontSize: "40px", color: "black", width: "70%" }}
          >
            Upload Medical Report
          </h4>
          <form
            onSubmit={this.onSubmit}
            encType="multipart/form-data"
            style={{ width: "70%" }}
          >
            <br></br>
            <br></br>
            <input
              type="file"
              id="file"
              name="file"
              onChange={this.captureFile}
              required
            />
            <br></br>
            <br></br>
            <label htmlFor="fname" style={{ fontSize: "20px" }}>
              Name
            </label>
            <input
              type="text"
              id="fname"
              name="fname"
              className="inputBox"
              placeholder="Please enter your name"
              onChange={this.handleInputChange}
              required
            />
            <br></br>
            <br></br>
            <label htmlFor="age" style={{ fontSize: "20px" }}>
              Age
            </label>
            <input
              type="text"
              id="age"
              name="age"
              className="inputBox"
              placeholder="Please enter your age"
              onChange={this.handleInputChange}
              required
            />
            <br></br>
            <br></br>
            <label htmlFor="doc" style={{ fontSize: "20px" }}>
              Requested By
            </label>
            <input
              type="text"
              id="doc"
              name="doc"
              className="inputBox"
              placeholder="Please enter name of doctor"
              onChange={this.handleInputChange}
              required
            />
            <br></br>
            <br></br>
            <label htmlFor="accessionNumber" style={{ fontSize: "20px" }}>
              Accession Number
            </label>
            <input
              type="text"
              id="accessionNumber"
              name="accessionNumber"
              className="inputBox"
              placeholder="Please enter accession number"
              onChange={this.handleInputChange}
              required
            />
            <br></br>
            <br></br>
            <input
              type="file"
              id="file"
              name="file"
              onChange={this.captureImage}
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
                Upload
                <i className="material-icons right">arrow_upward</i>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
