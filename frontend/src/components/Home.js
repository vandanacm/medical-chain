import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import homeimg from "../assets/home.png";

const Home = (props) => {
  const [account, setAccount] = useState(props.account);
  const [showOptions, setShowOptions] = useState(false);

  const handleClick = () => {
    setShowOptions(!showOptions);
  };

  return (
    <div>
      <div class="row">
        <div class="col s12">
          <div className="container">
            {/* <h2 style={{ textAlign: "center" }}>
              <b>The Medical Chain</b>
            </h2> */}
            <h2>
              <b>Welcome!</b>
            </h2>
            <i>
              <h4>A secure medical record system</h4>
            </i>
            <h6>
              Medical Chain uses <b>Blockchain</b> technology which provides
              decentralization and immutability to any data present on it.
            </h6>
            <p>
              Powered by the{" "}
              <b>
                <a href="https://ethereum.org/" target="_blank">
                  Ethereum Blockchain
                </a>
              </b>
            </p>
            <p>
              <i>
                Your account is: <b>{account}</b>
              </i>
            </p>
          </div>
        </div>
        {/* <div class="col s4">
                        <div className="container">
                            <ul class="collection with-header" style={{marginTop: 50}}>
                                <li style={{cursor:"pointer"}}class="collection-header" onClick={()=>{handleClick()}}><h6><b>Choose what you want to do</b></h6></li>
                                {showOptions ? (
                                    <>
                                    <li class="collection-item"><i className="material-icons">cloud_upload</i>&nbsp;&nbsp;&nbsp;<Link to='/upload'>Upload a medical report</Link></li>
                                <li class="collection-item"><i className="material-icons">insert_drive_file</i>&nbsp;&nbsp;&nbsp;<Link to='/view'>View your uploaded medical reports</Link></li>
                                <li class="collection-item"><i className="material-icons">person_add</i>&nbsp;&nbsp;&nbsp;<Link to='/doctors'>View/Add a trusted doctor</Link></li> </>
                                ) : null}
                                
                            </ul>
                        </div>
                    </div> */}
      </div>
      <div class="row">
        <div className="center-align">
          <img className="activator" src={homeimg} alt="" />
        </div>
        {/* {JSON.stringify({account: this.state.account}, null, 2)} */}
      </div>
    </div>
  );
};

export default Home;
