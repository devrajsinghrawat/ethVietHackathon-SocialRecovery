import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import FooterAdmin from "./FooterAdmin";
import TopBarAdmin from "./TopBarAdmin";
import SideBarAdmin from "./SideBarAdmin";

import CustomTable from "../CustomTable";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


import "react-toastify/dist/ReactToastify.css";
import { Button, TextField } from "@material-ui/core";
import axios from "axios";

const Enroll = () => {
  const [open, setOpen] = useState(false);
  const [wallet,setWallet]=useState("");
  const userId=localStorage.getItem("id");
  // const userId="0xcce0886d48beeda8ba9f136c74493ce0ad799bf6";
  const [fees,setFee]= useState("");
  const [spAddress,setSp]=useState("");
  console.log("this is user ID"+ userId);

  const columns = [
    { title: "SP Address", field: "SPAddress" },
    { title: "Rate", field: "Rate" },
    { title: "Rating", field: "Rating" },
    { title: "Fee", field: "Fee" },
  ];

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
   const Enroll= async (user) => {
    setOpen(false)
    try {
        const url = 'http://localhost:3001/enrollUser/';
        const param = { 
          type:"enroll",
          walletAddress:wallet,
          userAddressMM:userId,
          spAddress:spAddress,
          fee:fees
        };
        return await axios.post(url, param)
            .then(response => {
              toast.success(response.data.message, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            });
       
    } catch (error) {
        console.log('error while calling Signup API: ', error);
    }
}


  const data = [
    {
      SPAddress: "0xF9901CC6bbC8518088B2C8350fCd0635A23b250E",
      Rate: "10",
      Rating: 2,
      Fee:0.1,
    },
    {
      SPAddress: "0x23Ed077d5c630cF9b55324Ca3bC706a70ffCb696",
      Rate: "10",
      Rating: 3,
      Fee:0.1,
    },
    {
      SPAddress: "0xB2FB886Eb402848B772469a34a7180747C7F7934",
      Rate: "10",
      Rating: 3,
      Fee:0.1,
    },
    {
      SPAddress: "0x4Fb0a43C637566f2f18B2eE7034f430A7F95dBcF",
      Rate: "0.5",
      Rating: 4,
      Fee:0.1,
    },
    {
      SPAddress: "0x19b228f57165be621f49D96E26C459Aa115Eb83D",
      Rate: "20",
      Rating: 4,
    },
  ];

  const handleBulkDelete = () => {};

  const setWalletInfo=(e)=>{
    
    console.log(e.target.value);
    setWallet(e.target.value)
      
  }

  const handleRowUpdate = (newData, oldData, resolve,reject) => {
    setOpen(true);
    console.log("Data___",oldData.Fee);
    setFee(oldData.Fee);
    setSp(oldData.SPAddress);
    
     
 }


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
                          Enroll Me
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
                              selection: false,

                              headerStyle: {
                                backgroundColor: "#eaeffb",
                                color: "#000",
                              },
                            }}

                          actions={[
                            {
                              icon: 'save',
                              tooltip: 'Save User',
                              onClick: (event, rowData) => {
                                handleRowUpdate(event, rowData);
                                console.log(rowData);
                              }
                            }
                          ]}
                            
                            open={open}
                            setOpen={setOpen}
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
                  <TextField id="outlined-basic" value={wallet}  variant="outlined"  style={{width:"300px",height:"70px",marginTop:"10px"}}
                  onChange={(e)=>setWalletInfo(e)} />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={Enroll} autoFocus>
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
export default withRouter(Enroll);
