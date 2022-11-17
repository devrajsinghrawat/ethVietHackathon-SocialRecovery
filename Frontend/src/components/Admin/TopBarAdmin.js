import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

export default function TopBarAdmin() {
  const navigate = useHistory();
  const { isConnected } = useAccount();

  const handleLogOut = async () => {
    localStorage.removeItem("id");
    navigate.push("/");
  };

  useEffect(() => {
    if (!isConnected) {
      handleLogOut();
    }
  });

  return (
    <>
      <nav className="mb-4 bg-white shadow navbar navbar-expand navbar-light topbar static-top">
        <ul className="ml-auto navbar-nav">
          <div className="topbar-divider d-none d-sm-block"></div>

          <div className="mt-3">
            <ConnectButton
              label="Login With MetaMask"
              chainStatus="icon"
              accountStatus="avatar"
              showBalance={{
                smallScreen: false,
                largeScreen: true,
              }}
            />
          </div>
        </ul>
      </nav>
    </>
  );
}
