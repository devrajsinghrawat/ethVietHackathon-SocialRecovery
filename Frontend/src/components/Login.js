import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useHistory } from "react-router-dom";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useSession } from "next-auth/react";
import { useAccount, useSignMessage, useNetwork } from "wagmi";

import img_bck from "./../Digital-Vault2.png";

import "react-toastify/dist/ReactToastify.css";

export default function Login(props) {
  const navigate = useHistory();
  const [data, setdata] = useState();
  const { isConnected, address } = useAccount();
  const { chain } = useNetwork();
  const { status } = useSession();
  const { signMessageAsync } = useSignMessage();

  useEffect(() => {
    const handleAuth = async () => {
      const userData = { address, chain: chain.id, network: "evm" };
      const UAdd = userData.address;
      localStorage.setItem("id", UAdd);
      const getData = localStorage.getItem("id");
      setdata(getData);

      await axios
        .post("http://localhost:3001/addUser", userData)
        .then((res) => {});
      const message = "Hi This is social recovery dao";
      const signature = await signMessageAsync({ message });
    };

    if (status === "unauthenticated" && isConnected) {
      console.log("status+++", status);
      handleAuth();
      console.log("Enter_____");
      navigate.push("/dashboard");
    } else {
      //navigate.push('/signin')
    }
  }, [status, isConnected]);

  const myStyle = {
    backgroundImage: `url(${img_bck})`,
    height: "108vh",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    WebkitBackgroundSize: "cover",
    MozBackgroundSize: "cover",
    OBackgroundSize: "cover",
    position: "fixed",
    width: "100%",
  };

  const ad = localStorage.getItem("id");

  return (
    <>
      <div className="container-flui" style={myStyle}>
        <nav className="navbar navbar-dark bg-dark">
          <button className="navbar-brand">Social Recovery DAO</button>

          {(() => {
            if (ad == null || ad === "") {
              return <div></div>;
            } else {
              return (
                <div>
                  <Link to="/dashboard" className="navbar-nav ladshb">
                    Go To Admin Dashboard
                  </Link>
                </div>
              );
            }
          })()}

          <ConnectButton
            label="Login With MetaMask"
            chainStatus="icon"
            accountStatus="avatar"
            showBalance={{
              smallScreen: false,
              largeScreen: true,
            }}
          />
        </nav>

        <div className="container log_top"></div>
      </div>

      <ToastContainer />
    </>
  );
}
