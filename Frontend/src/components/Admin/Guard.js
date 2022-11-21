import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import FooterAdmin from "./FooterAdmin";
import TopBarAdmin from "./TopBarAdmin";
import SideBarAdmin from "./SideBarAdmin";
import CustomTable from "../CustomTable";
import "react-toastify/dist/ReactToastify.css";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, TextField } from "@material-ui/core";
import axios from "axios";
import { useEffect } from "react";
import Select from 'react-select'

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { SelectChangeEvent } from '@mui/material/Select';



// Guard comoponent
const Guard = () => {
  const [open, setOpen] = useState(false);
  const [wallet,setWallet]=useState("");
  const [walletId,setWalletId] = useState([]);
  const [Spdetail,setSpDetails] = useState([]);
  const [data,setData] = useState([]);
  const userId=localStorage.getItem("id");
  const [value,setValue]= useState("")
  const [walletname,setName] = useState("")
  // const userId="0xCce0886d48BeeDa8ba9f136C74493CE0AD799Bf6";

  const columns = [
    { title: "SP Address", field: "sp" },
    { title: "Fee", field: "fee" },
  ];


  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);


 

  const handleBulkDelete = () => {};

  const handleClose = () => {
    setOpen(false);
  };
  const setWalletInfo=e=>{
  console.log(e.target.value);
  setWallet(e.target.value);
  }

// fetch the guard me data from the backend
const getData=async() =>{

  const params = {
    
    
    "userAddress": userId,
  }

  try {
    const response=await axios.get("http://localhost:3001/getGuardMeDetails",{params});
    // setData(response.data.payload?.message);
    const temp=response.data.payload?.message;
    const temp1=temp.map(item=>item[0]);
    setWalletId(temp1);
    console.log(temp1);
    const temp2=temp.map(item=>item[1]);
    setSpDetails(temp2);
    // console.log(temp2);
    console.log("UserId",userId);
   

  }catch(error){
    console.log("hiii this is an error");
  }
}

useEffect(()=>{
  getData();
 
},[])

// drop down handler
const dropDownHandler=(id,obj)=>{
  
 console.log("obj",obj);
 setData(Spdetail[id]);
 setValue(obj);
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
                          Guard Me
                        </div>

                        <div
                        className="font-bold text-black"
                        style={{
                          fontSize: "18px",
                          fontWeight: "bold",
                          marginLeft:"auto",
                        }}
                      > 



                      <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Age</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={age}
                        label="Age"
                        onChange={handleChange}
                      >
                        <MenuItem value={10}>Ten</MenuItem>
                        
                      </Select>
                    </FormControl>






                     



                



                          
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
                                icon: "delete",
                                tooltip: "Delete all selected rows",
                                onClick: () => handleBulkDelete(),
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
                  <TextField id="outlined-basic"  variant="outlined"  style={{width:"400px",height:"100px",marginTop:"10px"}}
                  onChange={(e)=>setWalletInfo(e)} value={wallet}/>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} autoFocus>
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
