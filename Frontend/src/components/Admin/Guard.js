import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import FooterAdmin from "./FooterAdmin";
import TopBarAdmin from "./TopBarAdmin";
import SideBarAdmin from "./SideBarAdmin";
import CustomTable from "../CustomTable";
import "react-toastify/dist/ReactToastify.css";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, TextField } from "@material-ui/core";
import axios from "axios";
import { useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import DataUsageIcon from "@mui/icons-material/DataUsage";
import { signMessage } from "@wagmi/core";

// Guard comoponent
const Guard = () => {
  const [openRecover, setOpenRecovery] = useState(false);
  const [open, setOpen] = useState(false);
  const [wallet, setWallet] = useState("");
  const [walletId, setWalletId] = useState([]);
  const [Spdetail, setSpDetails] = useState([]);
  const [data, setData] = useState([]);

  const [oldUserId, setOldUser] = useState("");
  const userkey = localStorage.getItem("id");
  const [userId, setUserId] = useState(userkey);

  const [signedMessage, setSignedMessage] = useState("");
  // const userId=localStorage.getItem("id");

  const [value, setValue] = useState("Select Wallet Address");

  const [rowId, setSelectedRowId] = useState(null);
  const [isOpenRequestSignature, setOpenRequestSignature] = useState(false);

  // const userId="0xCce0886d48BeeDa8ba9f136C74493CE0AD799Bf6";

  const columns = [
    { title: "SP Address", field: "sp" },
    { title: "Fee", field: "fee" },
  ];

  const handleBulkDelete = () => {};

  const handleClose = () => {
    setOpen(false);
    setOpenRecovery(false);
  };

  // function for dropdown
  const setWalletInfo = (e) => {
    console.log(e.target.value);
    setWallet(e.target.value);
  };

  // function for recover button
  const setRecoverInformation = (e) => {
    setOldUser(e.target.value);
  };

  const handleRequestSignaturePopup = (_, data) => {
    console.log("rowdata",data);
    setSelectedRowId(data.tableData.id);
    setOpenRequestSignature(true);
  };

  // fetch the guard me data from the backend
  const getData = async () => {
    const params = {
      userAddress: userId,
    };

    try {
      const response = await axios.get(
        "http://localhost:3001/getGuardMeDetails",
        { params }
      );
      // setData(response.data.payload?.message);
      const temp = response.data.payload?.message;
      const temp1 = temp.map((item) => item[0]);
      setWalletId(temp1);
      console.log(temp1);
      const temp2 = temp.map((item) => item[1]);
      setSpDetails(temp2);
      // console.log(temp2);
      console.log("UserId", userId);
    } catch (error) {
      console.log("hiii this is an error");
    }
  };

  useEffect(() => {
    getData();
  }, userId);

  // // drop down handler
  // const dropDownHandler = (obj,id)=>{

  //  console.log( Spdetail[id]);
  //  setData(Spdetail[id]);
  //  setValue(obj)
  // }

  // Initiate Recovery function
  const InitiateRecovery = (e) => {
    setOpenRecovery(true);
    setOldUser(e.target.value);
  };

  // recovry Done Functions
  const handleInitiateRecovery= () => {
    setOpenRecovery(false);
    setUserId(oldUserId);
    console.log("olderId", oldUserId);
  };

  // drop down handler
  const dropDownHandler = (obj, id) => {
    console.log(Spdetail[id]);
    setData(Spdetail[id]);
    setValue(obj);
  };

  console.log("data", data);
  console.log("value", value);

  const requestSignMessage = (e) => {
    console.log(e.target.value);
    setSignedMessage(e.target.value);
  };
  const requestSignature = () => {
    console.log("data", data);

    const url = "http://localhost:3001/requestRecoverySignature/";
    const param = {
      walletAddress: value,
      userAddress: userkey,
      recoveryMsg: signedMessage,
      spAddress: data[rowId].sp,
      fee: data[rowId].fee,
    };
    console.log("param", param);

    axios.post(url, param).then((response) => {
      toast.success(response.data.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        onClose: () => {
          handleClose();
          window.location.reload();
        },
      });
    });
  };
  return (
    <>
      <div className="adm">
        <div className="mb-3">
          <div className="row" id="main">
            <div id="page-top">
              <div id="wrapper">
                <SideBarAdmin />

                <div id="content-wrapper" className="d-flex flex-column">
                  <div id="content">
                    <TopBarAdmin />

                    <div className="container-fluid">
                      <div className="mb-4 d-sm-flex align-items-center justify-content-between">
                        <div
                          className="font-bold text-black"
                          style={{
                            fontSize: "18px",
                            fontWeight: "bold",
                          }}
                        >
                          Guard Me
                        </div>

                        <div
                          className="font-bold text-black"
                          style={{
                            fontSize: "18px",
                            fontWeight: "bold",
                            marginLeft: "auto",
                          }}
                        >
                          {
                            // buttons  for guard me
                          }
                          <div className="d-flex p-2 ">
                            <Button
                              variant="contained"
                              style={{
                                marginRight: "20px",
                                background: "#1976d2",
                                color: "white",
                              }}
                              onClick={InitiateRecovery}
                            >
                              Recovery with New Address
                            </Button>

                            <DropdownButton
                              id="dropdown-basic-button"
                              title={value}
                            >
                              {walletId.map((obj, id) => (
                                <>
                                  <Dropdown.Item
                                    href="#/action-1"
                                    onClick={() => dropDownHandler(obj, id)}
                                  >
                                    {obj}
                                  </Dropdown.Item>
                                </>
                              ))}
                            </DropdownButton>
                          </div>

                     
                        </div>
                      </div>

                      <div className="compny">
                        <div className="col-sm-12 rsp">
                          <CustomTable
                            title=""
                            columns={columns}
                            data={data}
                            options={{
                              actionsColumnIndex: -1,
                              addRowPosition: "first",

                              headerStyle: {
                                backgroundColor: "#eaeffb",
                                color: "#000",
                              },
                            }}
                            actions={[
                              {
                                icon: () => <DeleteIcon color={"error"} />,
                                tooltip: "Delete all selected rows",
                                onClick: () => handleBulkDelete(),
                                iconProps: { color: "success" },
                              },
                              {
                                icon: () => <DataUsageIcon color={"warning"} />,
                                tooltip: "Fetch Signature",
                                onClick: handleRequestSignaturePopup,
                                // hidden:((rowdata=>rowdata.status  !== "pending"))
                              },
                            ]}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {"Enter your Wallet Address"}
                    </DialogTitle>
                    <DialogContent>
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        style={{
                          width: "400px",
                          height: "100px",
                          marginTop: "10px",
                        }}
                        onChange={(e) => setWalletInfo(e)}
                        value={wallet}
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose} autoFocus>
                        Done
                      </Button>
                    </DialogActions>
                  </Dialog>

                  {
                    // dialog for recovery
                  }

                  <Dialog
                    open={openRecover}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {"Enter your Registered Address"}
                    </DialogTitle>
                    <DialogContent>
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        style={{
                          width: "400px",
                          height: "100px",
                          marginTop: "10px",
                        }}
                        onChange={(e) => setRecoverInformation(e)}
                        value={oldUserId}
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleInitiateRecovery} autoFocus>
                        Done
                      </Button>
                    </DialogActions>
                  </Dialog>

                  {/* Request Signature Popup*/}
                  <Dialog
                    open={isOpenRequestSignature}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {"Please Enter Your Recovery Message"}
                    </DialogTitle>
                    <DialogContent>
                      <TextField
                        id="outlined-basic"
                        value={signedMessage}
                        variant="outlined"
                        style={{
                          width: "400px",
                          height: "70px",
                          marginTop: "10px",
                        }}
                        onChange={(e) => requestSignMessage(e)}
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={requestSignature} autoFocus>
                        Done
                      </Button>
                    </DialogActions>
                  </Dialog>

                  <FooterAdmin />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};
export default withRouter(Guard);
