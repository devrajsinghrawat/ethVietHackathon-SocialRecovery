import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import FooterAdmin from './FooterAdmin';
import TopBarAdmin from './TopBarAdmin';
import SideBarAdmin from './SideBarAdmin';

import CustomTable from '../CustomTable';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import { IconButton, Typography } from '@material-ui/core';
import 'react-toastify/dist/ReactToastify.css';
import { Button, TextField } from '@material-ui/core';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import DataUsageIcon from '@mui/icons-material/DataUsage';
import CloseIcon from '@mui/icons-material/Close';

import axios from 'axios';

const AdminDashboard = () => {
  const [enrollData, setData] = useState([]);
  const [isOpenDelete, setOpenDelete] = useState(false);
  const [isOpenConfirm, setOpenConfirm] = useState(false);
  const [isOpenApprove, setOpenApprove] = useState(false);
  const [isOpenReject, setOpenReject] = useState(false);

  const [wallet, setWallet] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [dltnotes, getdltNotes] = useState();
  const [isOpenAddEnrollUser, setOpenAddEnrollUser] = useState(false);
  const [isOpenFetchSignature, setOpenFetchSignature] = useState(false);

  const [RecoveryMessage, setRecoveryMessage] = useState('');
  const [sigData, setSignatureData] = useState('');
  // set open value
  const [OpenSignatureData, setOpenSignatureData] = useState(false);

  const [rowId, setRowID] = useState('');

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [valuesEnrollUser, setValuesEnrollUser] = useState({
    walletAddress: '',
    userAddress: '',
    spAddress: '',
    fee: '',
    type: '',
  });

  const columns2 = [
    { title: 'ReqId', field: 'enrollReqId' },
    { title: 'Wallet Address', field: 'walletAddress' },
    { title: 'SP address', field: 'spAddress' },
    { title: 'Type', field: 'type' },
    { title: 'Fee', field: 'fee' },
    { title: 'Status', field: 'status' },
  ];

  const handleClose = () => {
    setOpenDelete(false);
    setOpenConfirm(false);
    setOpenApprove(false);
    setOpenReject(false);
    setOpenAddEnrollUser(false);
    setOpenFetchSignature(false);
    setOpenSignatureData(false);
  };

  const dataWallet = [
    {
      SPAddress: '0xf9901cc6bbc8518088b2c8350fcd0635a23b250e',
      Rate: '10',
      Rating: 2,
    },
    {
      SPAddress: '0xBf7E2F0d6F3cE0AeD6711385b474d0cbdd966965',
      Rate: '10',
      Rating: 3,
    },
    {
      SPAddress: '0xEe45A7dfe2EbDB8d113Ec669F2682f27DAC5Fc31',
      Rate: '10',
      Rating: 3,
    },
    {
      SPAddress: '0xd5E5C7085d8e39e9242f910E1116B222c4002DC0',
      Rate: '0.5',
      Rating: 4,
    },
    {
      SPAddress: '0xF538E6A7b08e4E2770F81B97dB4bbB6C475a4d6c',
      Rate: '20',
      Rating: 4,
    },
    {
      SPAddress: '0x8d7477E0A4D9A3A5E81FeE5B0956Abf374C961bA',
      Rate: '20',
      Rating: 5,
    },
    {
      SPAddress: '0xF9901CC6bbC8518088B2C8350fCd0635A23b250E',
      Rate: '15',
      Rating: 5,
    },
    {
      SPAddress: '0x23Ed077d5c630cF9b55324Ca3bC706a70ffCb696',
      Rate: '15',
      Rating: 5,
    },
  ];
  //0xF9901CC6bbC8518088B2C8350fCd0635A23b250E

  const [isSP, setSP] = useState(dataWallet);
  const [selectedRowId, setSelectedRowId] = useState('');
  const UserKey = localStorage.getItem('id');

  //const UserKey = "0x4fb0a43c637566f2f18b2ee7034f430a7f95dbcf";
  const handleDeletePopup = (_, data) => {
    setSelectedRowId(data.enrollReqId);
    setOpenConfirm(true);
  };

  const handleConfirmPopup = (_, data) => {
    setSelectedRowId(data.enrollReqId);
    setOpenConfirm(true);
  };
  // it will fetch signauture for sp
  const handleFetchSignaturePopup = (_, data) => {
    console.log('FetchSignaturePopupData', data.enrollReqId);

    setOpenFetchSignature(true);
    setRowID(data.enrollReqId);
    fetchSignature(data.enrollReqId);
  };
  const handleApprovePopup = (_, data) => {
    setSelectedRowId(data.enrollReqId);
    setOpenApprove(true);
  };
  const handleRejectPopup = (_, data) => {
    setSelectedRowId(data.enrollReqId);
    setOpenReject(true);
  };
  const setWalletInfo = (e) => {
    console.log(e.target.value);
    setWallet(e.target.value);
  };
  //0x4fb0a43c637566f2f18b2ee7034f430a7f95dbcf
  const isFoundSP = isSP.some((item) => {
    if (item.SPAddress === UserKey) {
      return true;
    }
    return false;
  });
  console.log('isFoundSP', isFoundSP);

  // getEnrollData
  const getData = async () => {
    const params = {
      //"userAddress": "0xCce0886d48BeeDa8ba9f136C74493CE0AD799Bf6",
      userAddress: UserKey,
    };
    try {
      const response = await axios.get('http://localhost:3001/getEnrollData', {
        params,
      });
      //console.log('response', response);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleConfirm = () => {
    const url = 'http://localhost:3001/userConfirmEnrollRequest/';
    const param = { reqId: selectedRowId };
    axios.post(url, param).then((response) => {
      toast.success(response.data.message, {
        position: 'top-right',
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

  const handleDelete = () => {
    setOpenDelete(true);
  };

  const handleApprove = () => {
    console.log(selectedRowId);
    const url = 'http://localhost:3001/actUserEnrollRequest';
    const param = {
      reqId: selectedRowId,
      action: 'approved',
    };
    console.log(param);
    axios.patch(url, param).then((response) => {
      toast.success(response.data.message, {
        position: 'top-right',
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
  const handleReject = () => {
    console.log(selectedRowId);
    const url = 'http://localhost:3001/actUserEnrollRequest/';
    const param = {
      reqId: selectedRowId,
      action: 'rejected',
    };
    axios.patch(url, param).then((response) => {
      toast.success(response.data.message, {
        position: 'top-right',
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

  const columns1 = [
    {
      title: 'Action Type',
      field: 'ActionType',
    },
    { title: 'Account Hash', field: 'AccountHash' },
    { title: 'SP address', field: 'SPAddress' },
  ];

  const columns3 = [
    // {
    //   title: "Timestamp",
    //   field: "timestamp",
    // },
    { title: 'ReqId', field: 'enrollReqId' },
    { title: 'Type', field: 'type' },
    { title: 'Fee', field: 'fee' },
    { title: 'Status', field: 'status' },
  ];

  console.log('sp', isSP);
  console.log(UserKey);
  const handlePopupAddEnrollUser = () => {
    setOpenAddEnrollUser(true);
  };

  const handleChangeEnrollUser = (prop) => (event) => {
    setValuesEnrollUser({ ...valuesEnrollUser, [prop]: event.target.value });
  };

  // fetch signature sp
  const fetchSignature = async (RowID) => {
    console.log('this is fetch function');
    console.log('this is selectedRowId', RowID);
    setOpenFetchSignature(true);

    const reqIdParams = {
      reqId: RowID,
    };
    console.log('reqIdParams', reqIdParams);
    let response = await axios.get(
      `http://localhost:3001/fetchRecoveryMessage?reqId=${RowID}`
    );
    console.log(
      'this is message',
      response.data.payload?.message[0].recoveryMsg
    );

    // const {data:{payload:{message}}}=response;
    // console.log("recoveryMessage", message);
    setRecoveryMessage(response.data.payload?.message[0].recoveryMsg);

    // const getSignatureMessageData=async() =>{
    //   const reqIdParams = {
    //     ReqID: selectedRowId
    //   }
    //   try {
    //     const response=await axios.get("http://localhost:3001/getEnrollData", { params });
    //     //console.log('response', response);
    //     setData(response.data);
    //   }catch(error){
    //     console.log(error);
    //   }
    // }
  };

  const generateSignatur = async () => {
    handleClose();
    console.log('generateSignature rowID', rowId);
    const reqIdParams = {
      reqId: rowId,
    };
    const url = 'http://localhost:3001/generateSign';
    const response = await axios.patch(url, reqIdParams);
    console.log('generateSign', response);
    if (response) {
      toast.success(response.data.message, {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        onClose: () => {
          handleClose();
          //window.location.reload();
        },
      });
    }
  };

  // getSignatureData for recover,  user who whant recovery

  const getSignatureData = async (e, data) => {
    setOpenSignatureData(true);
    console.log('rowId for getSignatureData', data.enrollReqId);
    try {
      const response = await axios.get(
        `http://localhost:3001/getSignature?reqId=${data.enrollReqId}`
      );
      console.log('response for getSignatureData', response.data);
      setSignatureData(response.data.payload?.message[0].sigData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className='adm'>
        <div className='mb-3'>
          <div className='row' id='main'>
            <div id='page-top'>
              <div id='wrapper'>
                <SideBarAdmin />

                <div id='content-wrapper' className='d-flex flex-column'>
                  <div id='content'>
                    <TopBarAdmin />

                    <div className='container-fluid'>
                      <div className='tw-mb-4 tw-flex tw-justify-between tw-items-center tw-w-full'>
                        <h1 className='tw-text-black tw-text-[32px] tw-font-bold'>
                          Dashboard
                        </h1>
                      </div>

                      <div className=''>
                        <div className='tw-flex tw-gap-[10px] tw-flex-wrap tw-flex-1'>
                          <div className='tw-bg-white tw-px-[15px] tw-py-[11px] tw-rounded-[6px] tw-w-[calc(100%/3-7px)] tw-min-w-[calc(100%/3-7px)] tw-min-h-[140px] tw-flex tw-flex-col tw-justify-start'>
                            <div className='tw-w-[37px] tw-h-[37px] tw-rounded-full tw-bg-[#ECEEF6] tw-grid tw-place-items-center tw-cursor-pointer'>
                              <svg
                                version='1.1'
                                id='Layer_1'
                                x='0px'
                                y='0px'
                                viewBox='0 0 114.37 122.88'
                                width={18}
                              >
                                <g>
                                  <path
                                    className='st0'
                                    d='M40.59,72.87h11.07c0.94,0,1.73,0.77,1.73,1.73v9.34c0,0.94-0.77,1.73-1.73,1.73H40.59 c-0.94,0-1.73-0.77-1.73-1.73V74.6C38.87,73.64,39.64,72.87,40.59,72.87L40.59,72.87L40.59,72.87z M85.39,70.66 c-0.98-2.88-1.85-5.78-2.59-8.73c2.76-3.03,13.42-2.63,16.5-0.05l-2.84,6.75c1.53-2.01,2.04-2.83,2.95-3.95 c0.39,0.25,0.74,0.53,1.08,0.84c0.81,0.73,1.53,1.54,1.67,2.66c0.09,0.73-0.11,1.47-0.77,2.23l-6.51,7.59 c-0.84-0.14-1.66-0.34-2.45-0.62c0.37-0.87,0.82-1.83,1.19-2.7l-2.37,2.56c-2.47-0.52-4.46-0.21-6.31,0.77l-6.61-7.93 c-0.39-0.47-0.57-0.94-0.57-1.42c0.01-1.91,2.86-3.57,4.36-4.2L85.39,70.66L85.39,70.66L85.39,70.66z M6.53,0h79.18 c1.79,0,3.43,0.73,4.61,1.92C90.36,1.96,90.4,2,90.44,2.05c1.11,1.17,1.8,2.75,1.8,4.48v47c-0.59-0.04-1.18-0.05-1.76-0.05 c-0.72,0-1.44,0.03-2.15,0.09V6.53c0-0.69-0.26-1.31-0.69-1.77l-0.08-0.08c-0.48-0.48-1.13-0.77-1.85-0.77H6.53 c-0.72,0-1.38,0.29-1.85,0.76L4.67,4.68C4.2,5.15,3.91,5.8,3.91,6.53v107.08c0,0.68,0.26,1.31,0.69,1.77l0.08,0.08 c0.48,0.48,1.13,0.77,1.85,0.77h53.65c0.21,0.8,0.47,1.6,0.78,2.39c0.21,0.54,0.44,1.04,0.7,1.52H6.53c-1.79,0-3.43-0.73-4.61-1.92 c-0.04-0.04-0.08-0.09-0.12-0.13c-1.11-1.17-1.8-2.75-1.8-4.48V6.53c0-1.79,0.73-3.42,1.92-4.61l0.01-0.01C3.11,0.73,4.74,0,6.53,0 L6.53,0z M14.61,12.75h63.01c0.96,0,1.82,0.39,2.44,1.01c0.05,0.05,0.1,0.1,0.14,0.16c0.54,0.61,0.87,1.41,0.87,2.29V35.9 c0,0.95-0.39,1.81-1.01,2.44l-0.01,0.01c-0.63,0.63-1.49,1.01-2.44,1.01H14.61c-0.96,0-1.82-0.39-2.44-1.01 c-0.05-0.05-0.1-0.1-0.14-0.16c-0.54-0.61-0.87-1.41-0.87-2.29V16.21c0-0.94,0.39-1.8,1.02-2.43l0.01-0.01 C12.81,13.14,13.67,12.75,14.61,12.75L14.61,12.75z M77.17,16.66H15.07v18.79h62.11V16.66L77.17,16.66z M93.87,84.99l-1.29-5.9 c5.52,1.03,14.38,12.26,17.24,17.37c1.46,2.61,2.74,5.48,3.79,8.69c2.08,7.77,0.08,15.04-8.35,16.74 c-5.28,1.06-15.13,1.13-20.69,0.85c-5.97-0.31-15.22-0.3-17.63-6.43c-3.9-9.9,3.24-21.69,9.75-28.91c0.86-0.95,1.74-1.83,2.66-2.65 c2.37-2.08,4.92-4.55,7.97-5.59l-2.95,5.48l4.28-5.67h2.25L93.87,84.99L93.87,84.99L93.87,84.99z M91.12,89.83v1.04 c1.1,0.12,2.05,0.34,2.84,0.68c0.79,0.34,1.48,0.86,2.07,1.55c0.47,0.53,0.83,1.07,1.08,1.63c0.25,0.56,0.38,1.07,0.38,1.54 c0,0.52-0.19,0.97-0.56,1.34c-0.38,0.37-0.84,0.56-1.38,0.56c-1.02,0-1.67-0.55-1.97-1.64c-0.34-1.29-1.16-2.15-2.46-2.57v6.44 c1.28,0.35,2.3,0.67,3.06,0.96c0.76,0.29,1.44,0.7,2.04,1.25c0.64,0.56,1.13,1.25,1.48,2.03c0.34,0.79,0.52,1.65,0.52,2.59 c0,1.18-0.27,2.28-0.83,3.3c-0.55,1.03-1.37,1.86-2.44,2.52c-1.08,0.65-2.35,1.04-3.83,1.16v1.05c0,0.61-0.06,1.05-0.18,1.33 c-0.12,0.28-0.37,0.42-0.78,0.42c-0.37,0-0.63-0.11-0.78-0.34c-0.15-0.23-0.22-0.58-0.22-1.06v-1.38 c-1.21-0.13-2.26-0.42-3.17-0.85c-0.9-0.43-1.66-0.97-2.26-1.62c-0.6-0.65-1.05-1.32-1.33-2.01c-0.29-0.7-0.43-1.39-0.43-2.05 c0-0.49,0.19-0.94,0.58-1.34c0.39-0.39,0.87-0.59,1.44-0.59c0.47,0,0.86,0.11,1.18,0.32c0.32,0.22,0.54,0.52,0.67,0.91 c0.28,0.85,0.52,1.49,0.72,1.95c0.21,0.45,0.52,0.86,0.94,1.23c0.42,0.37,0.97,0.66,1.66,0.85v-7.2c-1.39-0.39-2.54-0.81-3.47-1.28 c-0.93-0.47-1.68-1.13-2.26-2c-0.57-0.87-0.87-1.98-0.87-3.34c0-1.78,0.56-3.23,1.69-4.36c1.13-1.13,2.76-1.8,4.9-1.98v-1.01 c0-0.87,0.33-1.3,0.98-1.3C90.79,88.56,91.12,88.98,91.12,89.83L91.12,89.83L91.12,89.83z M89.15,99.82v-5.93 c-0.87,0.26-1.55,0.6-2.03,1.02c-0.49,0.42-0.73,1.07-0.73,1.93c0,0.81,0.23,1.43,0.68,1.85C87.53,99.1,88.22,99.48,89.15,99.82 L89.15,99.82L89.15,99.82z M91.12,104.41v6.79c1.04-0.21,1.84-0.62,2.41-1.25c0.56-0.64,0.85-1.37,0.85-2.2 c0-0.9-0.28-1.59-0.83-2.08C93,105.17,92.19,104.75,91.12,104.41L91.12,104.41L91.12,104.41z M69.43,19.97h2.26v12.17h-2.26V19.97 L69.43,19.97L69.43,19.97z M16.07,50.67h11.07c0.94,0,1.73,0.77,1.73,1.73v9.34c0,0.94-0.77,1.73-1.73,1.73H16.07 c-0.94,0-1.73-0.77-1.73-1.73V52.4C14.35,51.44,15.13,50.67,16.07,50.67L16.07,50.67L16.07,50.67z M16.07,95.07h11.07 c0.94,0,1.73,0.77,1.73,1.73v9.34c0,0.95-0.77,1.73-1.73,1.73H16.07c-0.94,0-1.73-0.77-1.73-1.73V96.8 C14.35,95.85,15.13,95.07,16.07,95.07L16.07,95.07L16.07,95.07L16.07,95.07z M16.07,72.87h11.07c0.94,0,1.73,0.77,1.73,1.73v9.34 c0,0.94-0.77,1.73-1.73,1.73H16.07c-0.94,0-1.73-0.77-1.73-1.73V74.6C14.35,73.64,15.13,72.87,16.07,72.87L16.07,72.87L16.07,72.87 z M65.12,50.67h11.06c0.94,0,1.72,0.77,1.72,1.73v5.43c-0.59,0.7-1.03,1.52-1.27,2.4c-0.75,0.5-1.51,1.07-2.17,1.71 c-0.49,0.47-0.94,0.98-1.34,1.53h-7.99c-0.94,0-1.73-0.77-1.73-1.73V52.4C63.39,51.44,64.17,50.67,65.12,50.67L65.12,50.67 L65.12,50.67z M65.12,72.87h7.36c0.25,0.43,0.55,0.85,0.89,1.27l0.01-0.01l3.53,4.23c-0.38,0.33-0.75,0.66-1.11,0.98l-0.72,0.63 l0.01,0.02l-0.04,0.03c-0.62,0.55-1.15,1.05-1.6,1.5c-0.61,0.6-1.12,1.14-1.55,1.62c-0.71,0.79-1.43,1.63-2.15,2.52h-4.64 c-0.94,0-1.73-0.77-1.73-1.73V74.6C63.39,73.64,64.17,72.87,65.12,72.87L65.12,72.87L65.12,72.87z M40.59,50.67h11.07 c0.94,0,1.73,0.77,1.73,1.73v9.34c0,0.94-0.77,1.73-1.73,1.73H40.59c-0.94,0-1.73-0.77-1.73-1.73V52.4 C38.87,51.44,39.64,50.67,40.59,50.67L40.59,50.67L40.59,50.67z M40.59,95.07h11.07c0.94,0,1.73,0.77,1.73,1.73v9.34 c0,0.95-0.77,1.73-1.73,1.73H40.59c-0.94,0-1.73-0.77-1.73-1.73V96.8C38.87,95.85,39.64,95.07,40.59,95.07L40.59,95.07L40.59,95.07 z'
                                  />
                                </g>
                              </svg>
                            </div>

                            <div className='tw-mt-[12px]'>
                              <dl>
                                <dt className='tw-font-bold tw-text-[15px] tw-text-black tw-text-left'>
                                  Total Number of Sig Done
                                </dt>

                                <div className='tw-flex tw-items-center tw-mt-[12px] tw-text-left tw-text-[18px] tw-text-black'>
                                  0
                                </div>
                              </dl>
                            </div>
                          </div>

                          <div className='tw-bg-white tw-px-[15px] tw-py-[11px] tw-rounded-[6px] tw-w-[calc(100%/3-7px)] tw-min-w-[calc(100%/3-7px)] tw-min-h-[140px] tw-flex tw-flex-col tw-justify-start'>
                            <div className='tw-w-[37px] tw-h-[37px] tw-rounded-full tw-bg-[#ECEEF6] tw-grid tw-place-items-center tw-cursor-pointer'>
                              <svg
                                version='1.1'
                                id='Layer_1'
                                x='0px'
                                y='0px'
                                viewBox='0 0 114.37 122.88'
                                width={18}
                              >
                                <g>
                                  <path
                                    className='st0'
                                    d='M40.59,72.87h11.07c0.94,0,1.73,0.77,1.73,1.73v9.34c0,0.94-0.77,1.73-1.73,1.73H40.59 c-0.94,0-1.73-0.77-1.73-1.73V74.6C38.87,73.64,39.64,72.87,40.59,72.87L40.59,72.87L40.59,72.87z M85.39,70.66 c-0.98-2.88-1.85-5.78-2.59-8.73c2.76-3.03,13.42-2.63,16.5-0.05l-2.84,6.75c1.53-2.01,2.04-2.83,2.95-3.95 c0.39,0.25,0.74,0.53,1.08,0.84c0.81,0.73,1.53,1.54,1.67,2.66c0.09,0.73-0.11,1.47-0.77,2.23l-6.51,7.59 c-0.84-0.14-1.66-0.34-2.45-0.62c0.37-0.87,0.82-1.83,1.19-2.7l-2.37,2.56c-2.47-0.52-4.46-0.21-6.31,0.77l-6.61-7.93 c-0.39-0.47-0.57-0.94-0.57-1.42c0.01-1.91,2.86-3.57,4.36-4.2L85.39,70.66L85.39,70.66L85.39,70.66z M6.53,0h79.18 c1.79,0,3.43,0.73,4.61,1.92C90.36,1.96,90.4,2,90.44,2.05c1.11,1.17,1.8,2.75,1.8,4.48v47c-0.59-0.04-1.18-0.05-1.76-0.05 c-0.72,0-1.44,0.03-2.15,0.09V6.53c0-0.69-0.26-1.31-0.69-1.77l-0.08-0.08c-0.48-0.48-1.13-0.77-1.85-0.77H6.53 c-0.72,0-1.38,0.29-1.85,0.76L4.67,4.68C4.2,5.15,3.91,5.8,3.91,6.53v107.08c0,0.68,0.26,1.31,0.69,1.77l0.08,0.08 c0.48,0.48,1.13,0.77,1.85,0.77h53.65c0.21,0.8,0.47,1.6,0.78,2.39c0.21,0.54,0.44,1.04,0.7,1.52H6.53c-1.79,0-3.43-0.73-4.61-1.92 c-0.04-0.04-0.08-0.09-0.12-0.13c-1.11-1.17-1.8-2.75-1.8-4.48V6.53c0-1.79,0.73-3.42,1.92-4.61l0.01-0.01C3.11,0.73,4.74,0,6.53,0 L6.53,0z M14.61,12.75h63.01c0.96,0,1.82,0.39,2.44,1.01c0.05,0.05,0.1,0.1,0.14,0.16c0.54,0.61,0.87,1.41,0.87,2.29V35.9 c0,0.95-0.39,1.81-1.01,2.44l-0.01,0.01c-0.63,0.63-1.49,1.01-2.44,1.01H14.61c-0.96,0-1.82-0.39-2.44-1.01 c-0.05-0.05-0.1-0.1-0.14-0.16c-0.54-0.61-0.87-1.41-0.87-2.29V16.21c0-0.94,0.39-1.8,1.02-2.43l0.01-0.01 C12.81,13.14,13.67,12.75,14.61,12.75L14.61,12.75z M77.17,16.66H15.07v18.79h62.11V16.66L77.17,16.66z M93.87,84.99l-1.29-5.9 c5.52,1.03,14.38,12.26,17.24,17.37c1.46,2.61,2.74,5.48,3.79,8.69c2.08,7.77,0.08,15.04-8.35,16.74 c-5.28,1.06-15.13,1.13-20.69,0.85c-5.97-0.31-15.22-0.3-17.63-6.43c-3.9-9.9,3.24-21.69,9.75-28.91c0.86-0.95,1.74-1.83,2.66-2.65 c2.37-2.08,4.92-4.55,7.97-5.59l-2.95,5.48l4.28-5.67h2.25L93.87,84.99L93.87,84.99L93.87,84.99z M91.12,89.83v1.04 c1.1,0.12,2.05,0.34,2.84,0.68c0.79,0.34,1.48,0.86,2.07,1.55c0.47,0.53,0.83,1.07,1.08,1.63c0.25,0.56,0.38,1.07,0.38,1.54 c0,0.52-0.19,0.97-0.56,1.34c-0.38,0.37-0.84,0.56-1.38,0.56c-1.02,0-1.67-0.55-1.97-1.64c-0.34-1.29-1.16-2.15-2.46-2.57v6.44 c1.28,0.35,2.3,0.67,3.06,0.96c0.76,0.29,1.44,0.7,2.04,1.25c0.64,0.56,1.13,1.25,1.48,2.03c0.34,0.79,0.52,1.65,0.52,2.59 c0,1.18-0.27,2.28-0.83,3.3c-0.55,1.03-1.37,1.86-2.44,2.52c-1.08,0.65-2.35,1.04-3.83,1.16v1.05c0,0.61-0.06,1.05-0.18,1.33 c-0.12,0.28-0.37,0.42-0.78,0.42c-0.37,0-0.63-0.11-0.78-0.34c-0.15-0.23-0.22-0.58-0.22-1.06v-1.38 c-1.21-0.13-2.26-0.42-3.17-0.85c-0.9-0.43-1.66-0.97-2.26-1.62c-0.6-0.65-1.05-1.32-1.33-2.01c-0.29-0.7-0.43-1.39-0.43-2.05 c0-0.49,0.19-0.94,0.58-1.34c0.39-0.39,0.87-0.59,1.44-0.59c0.47,0,0.86,0.11,1.18,0.32c0.32,0.22,0.54,0.52,0.67,0.91 c0.28,0.85,0.52,1.49,0.72,1.95c0.21,0.45,0.52,0.86,0.94,1.23c0.42,0.37,0.97,0.66,1.66,0.85v-7.2c-1.39-0.39-2.54-0.81-3.47-1.28 c-0.93-0.47-1.68-1.13-2.26-2c-0.57-0.87-0.87-1.98-0.87-3.34c0-1.78,0.56-3.23,1.69-4.36c1.13-1.13,2.76-1.8,4.9-1.98v-1.01 c0-0.87,0.33-1.3,0.98-1.3C90.79,88.56,91.12,88.98,91.12,89.83L91.12,89.83L91.12,89.83z M89.15,99.82v-5.93 c-0.87,0.26-1.55,0.6-2.03,1.02c-0.49,0.42-0.73,1.07-0.73,1.93c0,0.81,0.23,1.43,0.68,1.85C87.53,99.1,88.22,99.48,89.15,99.82 L89.15,99.82L89.15,99.82z M91.12,104.41v6.79c1.04-0.21,1.84-0.62,2.41-1.25c0.56-0.64,0.85-1.37,0.85-2.2 c0-0.9-0.28-1.59-0.83-2.08C93,105.17,92.19,104.75,91.12,104.41L91.12,104.41L91.12,104.41z M69.43,19.97h2.26v12.17h-2.26V19.97 L69.43,19.97L69.43,19.97z M16.07,50.67h11.07c0.94,0,1.73,0.77,1.73,1.73v9.34c0,0.94-0.77,1.73-1.73,1.73H16.07 c-0.94,0-1.73-0.77-1.73-1.73V52.4C14.35,51.44,15.13,50.67,16.07,50.67L16.07,50.67L16.07,50.67z M16.07,95.07h11.07 c0.94,0,1.73,0.77,1.73,1.73v9.34c0,0.95-0.77,1.73-1.73,1.73H16.07c-0.94,0-1.73-0.77-1.73-1.73V96.8 C14.35,95.85,15.13,95.07,16.07,95.07L16.07,95.07L16.07,95.07L16.07,95.07z M16.07,72.87h11.07c0.94,0,1.73,0.77,1.73,1.73v9.34 c0,0.94-0.77,1.73-1.73,1.73H16.07c-0.94,0-1.73-0.77-1.73-1.73V74.6C14.35,73.64,15.13,72.87,16.07,72.87L16.07,72.87L16.07,72.87 z M65.12,50.67h11.06c0.94,0,1.72,0.77,1.72,1.73v5.43c-0.59,0.7-1.03,1.52-1.27,2.4c-0.75,0.5-1.51,1.07-2.17,1.71 c-0.49,0.47-0.94,0.98-1.34,1.53h-7.99c-0.94,0-1.73-0.77-1.73-1.73V52.4C63.39,51.44,64.17,50.67,65.12,50.67L65.12,50.67 L65.12,50.67z M65.12,72.87h7.36c0.25,0.43,0.55,0.85,0.89,1.27l0.01-0.01l3.53,4.23c-0.38,0.33-0.75,0.66-1.11,0.98l-0.72,0.63 l0.01,0.02l-0.04,0.03c-0.62,0.55-1.15,1.05-1.6,1.5c-0.61,0.6-1.12,1.14-1.55,1.62c-0.71,0.79-1.43,1.63-2.15,2.52h-4.64 c-0.94,0-1.73-0.77-1.73-1.73V74.6C63.39,73.64,64.17,72.87,65.12,72.87L65.12,72.87L65.12,72.87z M40.59,50.67h11.07 c0.94,0,1.73,0.77,1.73,1.73v9.34c0,0.94-0.77,1.73-1.73,1.73H40.59c-0.94,0-1.73-0.77-1.73-1.73V52.4 C38.87,51.44,39.64,50.67,40.59,50.67L40.59,50.67L40.59,50.67z M40.59,95.07h11.07c0.94,0,1.73,0.77,1.73,1.73v9.34 c0,0.95-0.77,1.73-1.73,1.73H40.59c-0.94,0-1.73-0.77-1.73-1.73V96.8C38.87,95.85,39.64,95.07,40.59,95.07L40.59,95.07L40.59,95.07 z'
                                  />
                                </g>
                              </svg>
                            </div>

                            <div className='tw-mt-[12px]'>
                              <dl>
                                <dt className='tw-font-bold tw-text-[15px] tw-text-black tw-text-left'>
                                  Treasury balance
                                </dt>

                                <div className='tw-flex tw-items-center tw-mt-[12px] tw-text-left tw-text-[18px] tw-text-black'>
                                  0
                                </div>
                              </dl>
                            </div>
                          </div>

                          <div className='tw-bg-white tw-px-[15px] tw-py-[11px] tw-rounded-[6px] tw-w-[calc(100%/3-7px)] tw-min-w-[calc(100%/3-7px)] tw-min-h-[140px] tw-flex tw-flex-col tw-justify-start'>
                            <div className='tw-w-[37px] tw-h-[37px] tw-rounded-full tw-bg-[#ECEEF6] tw-grid tw-place-items-center tw-cursor-pointer'>
                              <svg
                                version='1.1'
                                id='Layer_1'
                                x='0px'
                                y='0px'
                                viewBox='0 0 114.37 122.88'
                                width={18}
                              >
                                <g>
                                  <path
                                    className='st0'
                                    d='M40.59,72.87h11.07c0.94,0,1.73,0.77,1.73,1.73v9.34c0,0.94-0.77,1.73-1.73,1.73H40.59 c-0.94,0-1.73-0.77-1.73-1.73V74.6C38.87,73.64,39.64,72.87,40.59,72.87L40.59,72.87L40.59,72.87z M85.39,70.66 c-0.98-2.88-1.85-5.78-2.59-8.73c2.76-3.03,13.42-2.63,16.5-0.05l-2.84,6.75c1.53-2.01,2.04-2.83,2.95-3.95 c0.39,0.25,0.74,0.53,1.08,0.84c0.81,0.73,1.53,1.54,1.67,2.66c0.09,0.73-0.11,1.47-0.77,2.23l-6.51,7.59 c-0.84-0.14-1.66-0.34-2.45-0.62c0.37-0.87,0.82-1.83,1.19-2.7l-2.37,2.56c-2.47-0.52-4.46-0.21-6.31,0.77l-6.61-7.93 c-0.39-0.47-0.57-0.94-0.57-1.42c0.01-1.91,2.86-3.57,4.36-4.2L85.39,70.66L85.39,70.66L85.39,70.66z M6.53,0h79.18 c1.79,0,3.43,0.73,4.61,1.92C90.36,1.96,90.4,2,90.44,2.05c1.11,1.17,1.8,2.75,1.8,4.48v47c-0.59-0.04-1.18-0.05-1.76-0.05 c-0.72,0-1.44,0.03-2.15,0.09V6.53c0-0.69-0.26-1.31-0.69-1.77l-0.08-0.08c-0.48-0.48-1.13-0.77-1.85-0.77H6.53 c-0.72,0-1.38,0.29-1.85,0.76L4.67,4.68C4.2,5.15,3.91,5.8,3.91,6.53v107.08c0,0.68,0.26,1.31,0.69,1.77l0.08,0.08 c0.48,0.48,1.13,0.77,1.85,0.77h53.65c0.21,0.8,0.47,1.6,0.78,2.39c0.21,0.54,0.44,1.04,0.7,1.52H6.53c-1.79,0-3.43-0.73-4.61-1.92 c-0.04-0.04-0.08-0.09-0.12-0.13c-1.11-1.17-1.8-2.75-1.8-4.48V6.53c0-1.79,0.73-3.42,1.92-4.61l0.01-0.01C3.11,0.73,4.74,0,6.53,0 L6.53,0z M14.61,12.75h63.01c0.96,0,1.82,0.39,2.44,1.01c0.05,0.05,0.1,0.1,0.14,0.16c0.54,0.61,0.87,1.41,0.87,2.29V35.9 c0,0.95-0.39,1.81-1.01,2.44l-0.01,0.01c-0.63,0.63-1.49,1.01-2.44,1.01H14.61c-0.96,0-1.82-0.39-2.44-1.01 c-0.05-0.05-0.1-0.1-0.14-0.16c-0.54-0.61-0.87-1.41-0.87-2.29V16.21c0-0.94,0.39-1.8,1.02-2.43l0.01-0.01 C12.81,13.14,13.67,12.75,14.61,12.75L14.61,12.75z M77.17,16.66H15.07v18.79h62.11V16.66L77.17,16.66z M93.87,84.99l-1.29-5.9 c5.52,1.03,14.38,12.26,17.24,17.37c1.46,2.61,2.74,5.48,3.79,8.69c2.08,7.77,0.08,15.04-8.35,16.74 c-5.28,1.06-15.13,1.13-20.69,0.85c-5.97-0.31-15.22-0.3-17.63-6.43c-3.9-9.9,3.24-21.69,9.75-28.91c0.86-0.95,1.74-1.83,2.66-2.65 c2.37-2.08,4.92-4.55,7.97-5.59l-2.95,5.48l4.28-5.67h2.25L93.87,84.99L93.87,84.99L93.87,84.99z M91.12,89.83v1.04 c1.1,0.12,2.05,0.34,2.84,0.68c0.79,0.34,1.48,0.86,2.07,1.55c0.47,0.53,0.83,1.07,1.08,1.63c0.25,0.56,0.38,1.07,0.38,1.54 c0,0.52-0.19,0.97-0.56,1.34c-0.38,0.37-0.84,0.56-1.38,0.56c-1.02,0-1.67-0.55-1.97-1.64c-0.34-1.29-1.16-2.15-2.46-2.57v6.44 c1.28,0.35,2.3,0.67,3.06,0.96c0.76,0.29,1.44,0.7,2.04,1.25c0.64,0.56,1.13,1.25,1.48,2.03c0.34,0.79,0.52,1.65,0.52,2.59 c0,1.18-0.27,2.28-0.83,3.3c-0.55,1.03-1.37,1.86-2.44,2.52c-1.08,0.65-2.35,1.04-3.83,1.16v1.05c0,0.61-0.06,1.05-0.18,1.33 c-0.12,0.28-0.37,0.42-0.78,0.42c-0.37,0-0.63-0.11-0.78-0.34c-0.15-0.23-0.22-0.58-0.22-1.06v-1.38 c-1.21-0.13-2.26-0.42-3.17-0.85c-0.9-0.43-1.66-0.97-2.26-1.62c-0.6-0.65-1.05-1.32-1.33-2.01c-0.29-0.7-0.43-1.39-0.43-2.05 c0-0.49,0.19-0.94,0.58-1.34c0.39-0.39,0.87-0.59,1.44-0.59c0.47,0,0.86,0.11,1.18,0.32c0.32,0.22,0.54,0.52,0.67,0.91 c0.28,0.85,0.52,1.49,0.72,1.95c0.21,0.45,0.52,0.86,0.94,1.23c0.42,0.37,0.97,0.66,1.66,0.85v-7.2c-1.39-0.39-2.54-0.81-3.47-1.28 c-0.93-0.47-1.68-1.13-2.26-2c-0.57-0.87-0.87-1.98-0.87-3.34c0-1.78,0.56-3.23,1.69-4.36c1.13-1.13,2.76-1.8,4.9-1.98v-1.01 c0-0.87,0.33-1.3,0.98-1.3C90.79,88.56,91.12,88.98,91.12,89.83L91.12,89.83L91.12,89.83z M89.15,99.82v-5.93 c-0.87,0.26-1.55,0.6-2.03,1.02c-0.49,0.42-0.73,1.07-0.73,1.93c0,0.81,0.23,1.43,0.68,1.85C87.53,99.1,88.22,99.48,89.15,99.82 L89.15,99.82L89.15,99.82z M91.12,104.41v6.79c1.04-0.21,1.84-0.62,2.41-1.25c0.56-0.64,0.85-1.37,0.85-2.2 c0-0.9-0.28-1.59-0.83-2.08C93,105.17,92.19,104.75,91.12,104.41L91.12,104.41L91.12,104.41z M69.43,19.97h2.26v12.17h-2.26V19.97 L69.43,19.97L69.43,19.97z M16.07,50.67h11.07c0.94,0,1.73,0.77,1.73,1.73v9.34c0,0.94-0.77,1.73-1.73,1.73H16.07 c-0.94,0-1.73-0.77-1.73-1.73V52.4C14.35,51.44,15.13,50.67,16.07,50.67L16.07,50.67L16.07,50.67z M16.07,95.07h11.07 c0.94,0,1.73,0.77,1.73,1.73v9.34c0,0.95-0.77,1.73-1.73,1.73H16.07c-0.94,0-1.73-0.77-1.73-1.73V96.8 C14.35,95.85,15.13,95.07,16.07,95.07L16.07,95.07L16.07,95.07L16.07,95.07z M16.07,72.87h11.07c0.94,0,1.73,0.77,1.73,1.73v9.34 c0,0.94-0.77,1.73-1.73,1.73H16.07c-0.94,0-1.73-0.77-1.73-1.73V74.6C14.35,73.64,15.13,72.87,16.07,72.87L16.07,72.87L16.07,72.87 z M65.12,50.67h11.06c0.94,0,1.72,0.77,1.72,1.73v5.43c-0.59,0.7-1.03,1.52-1.27,2.4c-0.75,0.5-1.51,1.07-2.17,1.71 c-0.49,0.47-0.94,0.98-1.34,1.53h-7.99c-0.94,0-1.73-0.77-1.73-1.73V52.4C63.39,51.44,64.17,50.67,65.12,50.67L65.12,50.67 L65.12,50.67z M65.12,72.87h7.36c0.25,0.43,0.55,0.85,0.89,1.27l0.01-0.01l3.53,4.23c-0.38,0.33-0.75,0.66-1.11,0.98l-0.72,0.63 l0.01,0.02l-0.04,0.03c-0.62,0.55-1.15,1.05-1.6,1.5c-0.61,0.6-1.12,1.14-1.55,1.62c-0.71,0.79-1.43,1.63-2.15,2.52h-4.64 c-0.94,0-1.73-0.77-1.73-1.73V74.6C63.39,73.64,64.17,72.87,65.12,72.87L65.12,72.87L65.12,72.87z M40.59,50.67h11.07 c0.94,0,1.73,0.77,1.73,1.73v9.34c0,0.94-0.77,1.73-1.73,1.73H40.59c-0.94,0-1.73-0.77-1.73-1.73V52.4 C38.87,51.44,39.64,50.67,40.59,50.67L40.59,50.67L40.59,50.67z M40.59,95.07h11.07c0.94,0,1.73,0.77,1.73,1.73v9.34 c0,0.95-0.77,1.73-1.73,1.73H40.59c-0.94,0-1.73-0.77-1.73-1.73V96.8C38.87,95.85,39.64,95.07,40.59,95.07L40.59,95.07L40.59,95.07 z'
                                  />
                                </g>
                              </svg>
                            </div>

                            <div className='tw-mt-[12px]'>
                              <dl>
                                <dt className='tw-font-bold tw-text-[15px] tw-text-black tw-text-left'>
                                  Total DAO members{selectedRowId}
                                </dt>

                                <div className='tw-flex tw-items-center tw-mt-[12px] tw-text-left tw-text-[18px] tw-text-black'>
                                  0
                                </div>
                              </dl>
                            </div>
                          </div>

                          <div className='tw-bg-white tw-px-[15px] tw-py-[11px] tw-rounded-[6px] tw-w-full tw-min-h-[140px] tw-flex tw-flex-col tw-justify-start'>
                            <div className='tw-w-[37px] tw-h-[37px] tw-rounded-full tw-bg-[#ECEEF6] tw-grid tw-place-items-center tw-cursor-pointer'>
                              <svg
                                version='1.1'
                                id='Layer_1'
                                x='0px'
                                y='0px'
                                viewBox='0 0 114.37 122.88'
                                width={18}
                              >
                                <g>
                                  <path
                                    className='st0'
                                    d='M40.59,72.87h11.07c0.94,0,1.73,0.77,1.73,1.73v9.34c0,0.94-0.77,1.73-1.73,1.73H40.59 c-0.94,0-1.73-0.77-1.73-1.73V74.6C38.87,73.64,39.64,72.87,40.59,72.87L40.59,72.87L40.59,72.87z M85.39,70.66 c-0.98-2.88-1.85-5.78-2.59-8.73c2.76-3.03,13.42-2.63,16.5-0.05l-2.84,6.75c1.53-2.01,2.04-2.83,2.95-3.95 c0.39,0.25,0.74,0.53,1.08,0.84c0.81,0.73,1.53,1.54,1.67,2.66c0.09,0.73-0.11,1.47-0.77,2.23l-6.51,7.59 c-0.84-0.14-1.66-0.34-2.45-0.62c0.37-0.87,0.82-1.83,1.19-2.7l-2.37,2.56c-2.47-0.52-4.46-0.21-6.31,0.77l-6.61-7.93 c-0.39-0.47-0.57-0.94-0.57-1.42c0.01-1.91,2.86-3.57,4.36-4.2L85.39,70.66L85.39,70.66L85.39,70.66z M6.53,0h79.18 c1.79,0,3.43,0.73,4.61,1.92C90.36,1.96,90.4,2,90.44,2.05c1.11,1.17,1.8,2.75,1.8,4.48v47c-0.59-0.04-1.18-0.05-1.76-0.05 c-0.72,0-1.44,0.03-2.15,0.09V6.53c0-0.69-0.26-1.31-0.69-1.77l-0.08-0.08c-0.48-0.48-1.13-0.77-1.85-0.77H6.53 c-0.72,0-1.38,0.29-1.85,0.76L4.67,4.68C4.2,5.15,3.91,5.8,3.91,6.53v107.08c0,0.68,0.26,1.31,0.69,1.77l0.08,0.08 c0.48,0.48,1.13,0.77,1.85,0.77h53.65c0.21,0.8,0.47,1.6,0.78,2.39c0.21,0.54,0.44,1.04,0.7,1.52H6.53c-1.79,0-3.43-0.73-4.61-1.92 c-0.04-0.04-0.08-0.09-0.12-0.13c-1.11-1.17-1.8-2.75-1.8-4.48V6.53c0-1.79,0.73-3.42,1.92-4.61l0.01-0.01C3.11,0.73,4.74,0,6.53,0 L6.53,0z M14.61,12.75h63.01c0.96,0,1.82,0.39,2.44,1.01c0.05,0.05,0.1,0.1,0.14,0.16c0.54,0.61,0.87,1.41,0.87,2.29V35.9 c0,0.95-0.39,1.81-1.01,2.44l-0.01,0.01c-0.63,0.63-1.49,1.01-2.44,1.01H14.61c-0.96,0-1.82-0.39-2.44-1.01 c-0.05-0.05-0.1-0.1-0.14-0.16c-0.54-0.61-0.87-1.41-0.87-2.29V16.21c0-0.94,0.39-1.8,1.02-2.43l0.01-0.01 C12.81,13.14,13.67,12.75,14.61,12.75L14.61,12.75z M77.17,16.66H15.07v18.79h62.11V16.66L77.17,16.66z M93.87,84.99l-1.29-5.9 c5.52,1.03,14.38,12.26,17.24,17.37c1.46,2.61,2.74,5.48,3.79,8.69c2.08,7.77,0.08,15.04-8.35,16.74 c-5.28,1.06-15.13,1.13-20.69,0.85c-5.97-0.31-15.22-0.3-17.63-6.43c-3.9-9.9,3.24-21.69,9.75-28.91c0.86-0.95,1.74-1.83,2.66-2.65 c2.37-2.08,4.92-4.55,7.97-5.59l-2.95,5.48l4.28-5.67h2.25L93.87,84.99L93.87,84.99L93.87,84.99z M91.12,89.83v1.04 c1.1,0.12,2.05,0.34,2.84,0.68c0.79,0.34,1.48,0.86,2.07,1.55c0.47,0.53,0.83,1.07,1.08,1.63c0.25,0.56,0.38,1.07,0.38,1.54 c0,0.52-0.19,0.97-0.56,1.34c-0.38,0.37-0.84,0.56-1.38,0.56c-1.02,0-1.67-0.55-1.97-1.64c-0.34-1.29-1.16-2.15-2.46-2.57v6.44 c1.28,0.35,2.3,0.67,3.06,0.96c0.76,0.29,1.44,0.7,2.04,1.25c0.64,0.56,1.13,1.25,1.48,2.03c0.34,0.79,0.52,1.65,0.52,2.59 c0,1.18-0.27,2.28-0.83,3.3c-0.55,1.03-1.37,1.86-2.44,2.52c-1.08,0.65-2.35,1.04-3.83,1.16v1.05c0,0.61-0.06,1.05-0.18,1.33 c-0.12,0.28-0.37,0.42-0.78,0.42c-0.37,0-0.63-0.11-0.78-0.34c-0.15-0.23-0.22-0.58-0.22-1.06v-1.38 c-1.21-0.13-2.26-0.42-3.17-0.85c-0.9-0.43-1.66-0.97-2.26-1.62c-0.6-0.65-1.05-1.32-1.33-2.01c-0.29-0.7-0.43-1.39-0.43-2.05 c0-0.49,0.19-0.94,0.58-1.34c0.39-0.39,0.87-0.59,1.44-0.59c0.47,0,0.86,0.11,1.18,0.32c0.32,0.22,0.54,0.52,0.67,0.91 c0.28,0.85,0.52,1.49,0.72,1.95c0.21,0.45,0.52,0.86,0.94,1.23c0.42,0.37,0.97,0.66,1.66,0.85v-7.2c-1.39-0.39-2.54-0.81-3.47-1.28 c-0.93-0.47-1.68-1.13-2.26-2c-0.57-0.87-0.87-1.98-0.87-3.34c0-1.78,0.56-3.23,1.69-4.36c1.13-1.13,2.76-1.8,4.9-1.98v-1.01 c0-0.87,0.33-1.3,0.98-1.3C90.79,88.56,91.12,88.98,91.12,89.83L91.12,89.83L91.12,89.83z M89.15,99.82v-5.93 c-0.87,0.26-1.55,0.6-2.03,1.02c-0.49,0.42-0.73,1.07-0.73,1.93c0,0.81,0.23,1.43,0.68,1.85C87.53,99.1,88.22,99.48,89.15,99.82 L89.15,99.82L89.15,99.82z M91.12,104.41v6.79c1.04-0.21,1.84-0.62,2.41-1.25c0.56-0.64,0.85-1.37,0.85-2.2 c0-0.9-0.28-1.59-0.83-2.08C93,105.17,92.19,104.75,91.12,104.41L91.12,104.41L91.12,104.41z M69.43,19.97h2.26v12.17h-2.26V19.97 L69.43,19.97L69.43,19.97z M16.07,50.67h11.07c0.94,0,1.73,0.77,1.73,1.73v9.34c0,0.94-0.77,1.73-1.73,1.73H16.07 c-0.94,0-1.73-0.77-1.73-1.73V52.4C14.35,51.44,15.13,50.67,16.07,50.67L16.07,50.67L16.07,50.67z M16.07,95.07h11.07 c0.94,0,1.73,0.77,1.73,1.73v9.34c0,0.95-0.77,1.73-1.73,1.73H16.07c-0.94,0-1.73-0.77-1.73-1.73V96.8 C14.35,95.85,15.13,95.07,16.07,95.07L16.07,95.07L16.07,95.07L16.07,95.07z M16.07,72.87h11.07c0.94,0,1.73,0.77,1.73,1.73v9.34 c0,0.94-0.77,1.73-1.73,1.73H16.07c-0.94,0-1.73-0.77-1.73-1.73V74.6C14.35,73.64,15.13,72.87,16.07,72.87L16.07,72.87L16.07,72.87 z M65.12,50.67h11.06c0.94,0,1.72,0.77,1.72,1.73v5.43c-0.59,0.7-1.03,1.52-1.27,2.4c-0.75,0.5-1.51,1.07-2.17,1.71 c-0.49,0.47-0.94,0.98-1.34,1.53h-7.99c-0.94,0-1.73-0.77-1.73-1.73V52.4C63.39,51.44,64.17,50.67,65.12,50.67L65.12,50.67 L65.12,50.67z M65.12,72.87h7.36c0.25,0.43,0.55,0.85,0.89,1.27l0.01-0.01l3.53,4.23c-0.38,0.33-0.75,0.66-1.11,0.98l-0.72,0.63 l0.01,0.02l-0.04,0.03c-0.62,0.55-1.15,1.05-1.6,1.5c-0.61,0.6-1.12,1.14-1.55,1.62c-0.71,0.79-1.43,1.63-2.15,2.52h-4.64 c-0.94,0-1.73-0.77-1.73-1.73V74.6C63.39,73.64,64.17,72.87,65.12,72.87L65.12,72.87L65.12,72.87z M40.59,50.67h11.07 c0.94,0,1.73,0.77,1.73,1.73v9.34c0,0.94-0.77,1.73-1.73,1.73H40.59c-0.94,0-1.73-0.77-1.73-1.73V52.4 C38.87,51.44,39.64,50.67,40.59,50.67L40.59,50.67L40.59,50.67z M40.59,95.07h11.07c0.94,0,1.73,0.77,1.73,1.73v9.34 c0,0.95-0.77,1.73-1.73,1.73H40.59c-0.94,0-1.73-0.77-1.73-1.73V96.8C38.87,95.85,39.64,95.07,40.59,95.07L40.59,95.07L40.59,95.07 z'
                                  />
                                </g>
                              </svg>
                            </div>

                            <div className='tw-mt-[12px]'>
                              <dl>
                                <dt className='tw-text-[15px] tw-text-black tw-text-left tw-font-bold'>
                                  Signing Activity
                                </dt>

                                <div className='tw-mt-5'>
                                  <CustomTable
                                    title='All Candidates List'
                                    columns={columns1}
                                    data={[]}
                                    options={{
                                      actionsColumnIndex: -1,
                                      addRowPosition: 'first',
                                      selection: true,

                                      headerStyle: {
                                        backgroundColor: '#eaeffb',
                                        color: '#000',
                                      },
                                    }}
                                    actions={[
                                      {
                                        icon: 'save',
                                        tooltip: 'Save User',
                                        onClick: (event, rowData) =>
                                          alert('You saved ' + rowData.name),
                                      },
                                    ]}
                                  />
                                </div>
                              </dl>
                            </div>
                          </div>

                          {!isFoundSP && (
                            <div className='tw-bg-white tw-px-[15px] tw-py-[11px] tw-rounded-[6px] tw-w-full tw-min-h-[140px] tw-flex tw-flex-col tw-justify-start'>
                              <div className='tw-w-[37px] tw-h-[37px] tw-rounded-full tw-bg-[#ECEEF6] tw-grid tw-place-items-center tw-cursor-pointer'>
                                <svg
                                  version='1.1'
                                  id='Layer_1'
                                  x='0px'
                                  y='0px'
                                  viewBox='0 0 114.37 122.88'
                                  width={18}
                                >
                                  <g>
                                    <path
                                      className='st0'
                                      d='M40.59,72.87h11.07c0.94,0,1.73,0.77,1.73,1.73v9.34c0,0.94-0.77,1.73-1.73,1.73H40.59 c-0.94,0-1.73-0.77-1.73-1.73V74.6C38.87,73.64,39.64,72.87,40.59,72.87L40.59,72.87L40.59,72.87z M85.39,70.66 c-0.98-2.88-1.85-5.78-2.59-8.73c2.76-3.03,13.42-2.63,16.5-0.05l-2.84,6.75c1.53-2.01,2.04-2.83,2.95-3.95 c0.39,0.25,0.74,0.53,1.08,0.84c0.81,0.73,1.53,1.54,1.67,2.66c0.09,0.73-0.11,1.47-0.77,2.23l-6.51,7.59 c-0.84-0.14-1.66-0.34-2.45-0.62c0.37-0.87,0.82-1.83,1.19-2.7l-2.37,2.56c-2.47-0.52-4.46-0.21-6.31,0.77l-6.61-7.93 c-0.39-0.47-0.57-0.94-0.57-1.42c0.01-1.91,2.86-3.57,4.36-4.2L85.39,70.66L85.39,70.66L85.39,70.66z M6.53,0h79.18 c1.79,0,3.43,0.73,4.61,1.92C90.36,1.96,90.4,2,90.44,2.05c1.11,1.17,1.8,2.75,1.8,4.48v47c-0.59-0.04-1.18-0.05-1.76-0.05 c-0.72,0-1.44,0.03-2.15,0.09V6.53c0-0.69-0.26-1.31-0.69-1.77l-0.08-0.08c-0.48-0.48-1.13-0.77-1.85-0.77H6.53 c-0.72,0-1.38,0.29-1.85,0.76L4.67,4.68C4.2,5.15,3.91,5.8,3.91,6.53v107.08c0,0.68,0.26,1.31,0.69,1.77l0.08,0.08 c0.48,0.48,1.13,0.77,1.85,0.77h53.65c0.21,0.8,0.47,1.6,0.78,2.39c0.21,0.54,0.44,1.04,0.7,1.52H6.53c-1.79,0-3.43-0.73-4.61-1.92 c-0.04-0.04-0.08-0.09-0.12-0.13c-1.11-1.17-1.8-2.75-1.8-4.48V6.53c0-1.79,0.73-3.42,1.92-4.61l0.01-0.01C3.11,0.73,4.74,0,6.53,0 L6.53,0z M14.61,12.75h63.01c0.96,0,1.82,0.39,2.44,1.01c0.05,0.05,0.1,0.1,0.14,0.16c0.54,0.61,0.87,1.41,0.87,2.29V35.9 c0,0.95-0.39,1.81-1.01,2.44l-0.01,0.01c-0.63,0.63-1.49,1.01-2.44,1.01H14.61c-0.96,0-1.82-0.39-2.44-1.01 c-0.05-0.05-0.1-0.1-0.14-0.16c-0.54-0.61-0.87-1.41-0.87-2.29V16.21c0-0.94,0.39-1.8,1.02-2.43l0.01-0.01 C12.81,13.14,13.67,12.75,14.61,12.75L14.61,12.75z M77.17,16.66H15.07v18.79h62.11V16.66L77.17,16.66z M93.87,84.99l-1.29-5.9 c5.52,1.03,14.38,12.26,17.24,17.37c1.46,2.61,2.74,5.48,3.79,8.69c2.08,7.77,0.08,15.04-8.35,16.74 c-5.28,1.06-15.13,1.13-20.69,0.85c-5.97-0.31-15.22-0.3-17.63-6.43c-3.9-9.9,3.24-21.69,9.75-28.91c0.86-0.95,1.74-1.83,2.66-2.65 c2.37-2.08,4.92-4.55,7.97-5.59l-2.95,5.48l4.28-5.67h2.25L93.87,84.99L93.87,84.99L93.87,84.99z M91.12,89.83v1.04 c1.1,0.12,2.05,0.34,2.84,0.68c0.79,0.34,1.48,0.86,2.07,1.55c0.47,0.53,0.83,1.07,1.08,1.63c0.25,0.56,0.38,1.07,0.38,1.54 c0,0.52-0.19,0.97-0.56,1.34c-0.38,0.37-0.84,0.56-1.38,0.56c-1.02,0-1.67-0.55-1.97-1.64c-0.34-1.29-1.16-2.15-2.46-2.57v6.44 c1.28,0.35,2.3,0.67,3.06,0.96c0.76,0.29,1.44,0.7,2.04,1.25c0.64,0.56,1.13,1.25,1.48,2.03c0.34,0.79,0.52,1.65,0.52,2.59 c0,1.18-0.27,2.28-0.83,3.3c-0.55,1.03-1.37,1.86-2.44,2.52c-1.08,0.65-2.35,1.04-3.83,1.16v1.05c0,0.61-0.06,1.05-0.18,1.33 c-0.12,0.28-0.37,0.42-0.78,0.42c-0.37,0-0.63-0.11-0.78-0.34c-0.15-0.23-0.22-0.58-0.22-1.06v-1.38 c-1.21-0.13-2.26-0.42-3.17-0.85c-0.9-0.43-1.66-0.97-2.26-1.62c-0.6-0.65-1.05-1.32-1.33-2.01c-0.29-0.7-0.43-1.39-0.43-2.05 c0-0.49,0.19-0.94,0.58-1.34c0.39-0.39,0.87-0.59,1.44-0.59c0.47,0,0.86,0.11,1.18,0.32c0.32,0.22,0.54,0.52,0.67,0.91 c0.28,0.85,0.52,1.49,0.72,1.95c0.21,0.45,0.52,0.86,0.94,1.23c0.42,0.37,0.97,0.66,1.66,0.85v-7.2c-1.39-0.39-2.54-0.81-3.47-1.28 c-0.93-0.47-1.68-1.13-2.26-2c-0.57-0.87-0.87-1.98-0.87-3.34c0-1.78,0.56-3.23,1.69-4.36c1.13-1.13,2.76-1.8,4.9-1.98v-1.01 c0-0.87,0.33-1.3,0.98-1.3C90.79,88.56,91.12,88.98,91.12,89.83L91.12,89.83L91.12,89.83z M89.15,99.82v-5.93 c-0.87,0.26-1.55,0.6-2.03,1.02c-0.49,0.42-0.73,1.07-0.73,1.93c0,0.81,0.23,1.43,0.68,1.85C87.53,99.1,88.22,99.48,89.15,99.82 L89.15,99.82L89.15,99.82z M91.12,104.41v6.79c1.04-0.21,1.84-0.62,2.41-1.25c0.56-0.64,0.85-1.37,0.85-2.2 c0-0.9-0.28-1.59-0.83-2.08C93,105.17,92.19,104.75,91.12,104.41L91.12,104.41L91.12,104.41z M69.43,19.97h2.26v12.17h-2.26V19.97 L69.43,19.97L69.43,19.97z M16.07,50.67h11.07c0.94,0,1.73,0.77,1.73,1.73v9.34c0,0.94-0.77,1.73-1.73,1.73H16.07 c-0.94,0-1.73-0.77-1.73-1.73V52.4C14.35,51.44,15.13,50.67,16.07,50.67L16.07,50.67L16.07,50.67z M16.07,95.07h11.07 c0.94,0,1.73,0.77,1.73,1.73v9.34c0,0.95-0.77,1.73-1.73,1.73H16.07c-0.94,0-1.73-0.77-1.73-1.73V96.8 C14.35,95.85,15.13,95.07,16.07,95.07L16.07,95.07L16.07,95.07L16.07,95.07z M16.07,72.87h11.07c0.94,0,1.73,0.77,1.73,1.73v9.34 c0,0.94-0.77,1.73-1.73,1.73H16.07c-0.94,0-1.73-0.77-1.73-1.73V74.6C14.35,73.64,15.13,72.87,16.07,72.87L16.07,72.87L16.07,72.87 z M65.12,50.67h11.06c0.94,0,1.72,0.77,1.72,1.73v5.43c-0.59,0.7-1.03,1.52-1.27,2.4c-0.75,0.5-1.51,1.07-2.17,1.71 c-0.49,0.47-0.94,0.98-1.34,1.53h-7.99c-0.94,0-1.73-0.77-1.73-1.73V52.4C63.39,51.44,64.17,50.67,65.12,50.67L65.12,50.67 L65.12,50.67z M65.12,72.87h7.36c0.25,0.43,0.55,0.85,0.89,1.27l0.01-0.01l3.53,4.23c-0.38,0.33-0.75,0.66-1.11,0.98l-0.72,0.63 l0.01,0.02l-0.04,0.03c-0.62,0.55-1.15,1.05-1.6,1.5c-0.61,0.6-1.12,1.14-1.55,1.62c-0.71,0.79-1.43,1.63-2.15,2.52h-4.64 c-0.94,0-1.73-0.77-1.73-1.73V74.6C63.39,73.64,64.17,72.87,65.12,72.87L65.12,72.87L65.12,72.87z M40.59,50.67h11.07 c0.94,0,1.73,0.77,1.73,1.73v9.34c0,0.94-0.77,1.73-1.73,1.73H40.59c-0.94,0-1.73-0.77-1.73-1.73V52.4 C38.87,51.44,39.64,50.67,40.59,50.67L40.59,50.67L40.59,50.67z M40.59,95.07h11.07c0.94,0,1.73,0.77,1.73,1.73v9.34 c0,0.95-0.77,1.73-1.73,1.73H40.59c-0.94,0-1.73-0.77-1.73-1.73V96.8C38.87,95.85,39.64,95.07,40.59,95.07L40.59,95.07L40.59,95.07 z'
                                    />
                                  </g>
                                </svg>
                              </div>
                              <div className='tw-mt-[12px]'>
                                <dl>
                                  <dt className='tw-font-bold tw-text-[15px] tw-text-black tw-text-left'>
                                    Open Request
                                  </dt>

                                  <div className='tw-mt-5'>
                                    <CustomTable
                                      title='All Candidates List'
                                      columns={columns2}
                                      data={enrollData.payload?.message}
                                      onSelectionChange={(rows) =>
                                        setSelectedRows(rows)
                                      }
                                      options={{
                                        actionsColumnIndex: -1,
                                        addRowPosition: 'first',
                                        selection: false,
                                        headerStyle: {
                                          backgroundColor: '#eaeffb',
                                          color: '#000',
                                        },
                                      }}
                                      actions={[
                                        (rowData) => ({
                                          icon: () => (
                                            <DeleteIcon color={'error'} />
                                          ),
                                          tooltip: 'Delete',
                                          onClick: handleDeletePopup,
                                        }),
                                        (rowData) => ({
                                          icon: () => (
                                            <CheckIcon color={'success'} />
                                          ),
                                          tooltip: 'Confirm',
                                          onClick: handleConfirmPopup,
                                          hidden:
                                            rowData.status === 'pending' ||
                                            rowData.status === 'signed',
                                        }),
                                        (rowData) => ({
                                          icon: () => (
                                            <DataUsageIcon color={'warning'} />
                                          ),
                                          tooltip: 'Fetch Signature',
                                          onClick: getSignatureData,
                                          hidden:
                                            rowData.status !== 'signed' &&
                                            rowData.status === 'pending' &&
                                            rowData.type !== 'sign',
                                          disabled: rowData.status !== 'signed',
                                        }),
                                      ]}
                                    />
                                  </div>
                                </dl>
                              </div>
                            </div>
                          )}

                          {isFoundSP && (
                            <div className='tw-bg-white tw-px-[15px] tw-py-[11px] tw-rounded-[6px] tw-w-full tw-min-h-[140px] tw-flex tw-flex-col tw-justify-start'>
                              <div className='tw-w-[37px] tw-h-[37px] tw-rounded-full tw-bg-[#ECEEF6] tw-grid tw-place-items-center tw-cursor-pointer'>
                                <svg
                                  version='1.1'
                                  id='Layer_1'
                                  x='0px'
                                  y='0px'
                                  viewBox='0 0 114.37 122.88'
                                  width={18}
                                >
                                  <g>
                                    <path
                                      className='st0'
                                      d='M40.59,72.87h11.07c0.94,0,1.73,0.77,1.73,1.73v9.34c0,0.94-0.77,1.73-1.73,1.73H40.59 c-0.94,0-1.73-0.77-1.73-1.73V74.6C38.87,73.64,39.64,72.87,40.59,72.87L40.59,72.87L40.59,72.87z M85.39,70.66 c-0.98-2.88-1.85-5.78-2.59-8.73c2.76-3.03,13.42-2.63,16.5-0.05l-2.84,6.75c1.53-2.01,2.04-2.83,2.95-3.95 c0.39,0.25,0.74,0.53,1.08,0.84c0.81,0.73,1.53,1.54,1.67,2.66c0.09,0.73-0.11,1.47-0.77,2.23l-6.51,7.59 c-0.84-0.14-1.66-0.34-2.45-0.62c0.37-0.87,0.82-1.83,1.19-2.7l-2.37,2.56c-2.47-0.52-4.46-0.21-6.31,0.77l-6.61-7.93 c-0.39-0.47-0.57-0.94-0.57-1.42c0.01-1.91,2.86-3.57,4.36-4.2L85.39,70.66L85.39,70.66L85.39,70.66z M6.53,0h79.18 c1.79,0,3.43,0.73,4.61,1.92C90.36,1.96,90.4,2,90.44,2.05c1.11,1.17,1.8,2.75,1.8,4.48v47c-0.59-0.04-1.18-0.05-1.76-0.05 c-0.72,0-1.44,0.03-2.15,0.09V6.53c0-0.69-0.26-1.31-0.69-1.77l-0.08-0.08c-0.48-0.48-1.13-0.77-1.85-0.77H6.53 c-0.72,0-1.38,0.29-1.85,0.76L4.67,4.68C4.2,5.15,3.91,5.8,3.91,6.53v107.08c0,0.68,0.26,1.31,0.69,1.77l0.08,0.08 c0.48,0.48,1.13,0.77,1.85,0.77h53.65c0.21,0.8,0.47,1.6,0.78,2.39c0.21,0.54,0.44,1.04,0.7,1.52H6.53c-1.79,0-3.43-0.73-4.61-1.92 c-0.04-0.04-0.08-0.09-0.12-0.13c-1.11-1.17-1.8-2.75-1.8-4.48V6.53c0-1.79,0.73-3.42,1.92-4.61l0.01-0.01C3.11,0.73,4.74,0,6.53,0 L6.53,0z M14.61,12.75h63.01c0.96,0,1.82,0.39,2.44,1.01c0.05,0.05,0.1,0.1,0.14,0.16c0.54,0.61,0.87,1.41,0.87,2.29V35.9 c0,0.95-0.39,1.81-1.01,2.44l-0.01,0.01c-0.63,0.63-1.49,1.01-2.44,1.01H14.61c-0.96,0-1.82-0.39-2.44-1.01 c-0.05-0.05-0.1-0.1-0.14-0.16c-0.54-0.61-0.87-1.41-0.87-2.29V16.21c0-0.94,0.39-1.8,1.02-2.43l0.01-0.01 C12.81,13.14,13.67,12.75,14.61,12.75L14.61,12.75z M77.17,16.66H15.07v18.79h62.11V16.66L77.17,16.66z M93.87,84.99l-1.29-5.9 c5.52,1.03,14.38,12.26,17.24,17.37c1.46,2.61,2.74,5.48,3.79,8.69c2.08,7.77,0.08,15.04-8.35,16.74 c-5.28,1.06-15.13,1.13-20.69,0.85c-5.97-0.31-15.22-0.3-17.63-6.43c-3.9-9.9,3.24-21.69,9.75-28.91c0.86-0.95,1.74-1.83,2.66-2.65 c2.37-2.08,4.92-4.55,7.97-5.59l-2.95,5.48l4.28-5.67h2.25L93.87,84.99L93.87,84.99L93.87,84.99z M91.12,89.83v1.04 c1.1,0.12,2.05,0.34,2.84,0.68c0.79,0.34,1.48,0.86,2.07,1.55c0.47,0.53,0.83,1.07,1.08,1.63c0.25,0.56,0.38,1.07,0.38,1.54 c0,0.52-0.19,0.97-0.56,1.34c-0.38,0.37-0.84,0.56-1.38,0.56c-1.02,0-1.67-0.55-1.97-1.64c-0.34-1.29-1.16-2.15-2.46-2.57v6.44 c1.28,0.35,2.3,0.67,3.06,0.96c0.76,0.29,1.44,0.7,2.04,1.25c0.64,0.56,1.13,1.25,1.48,2.03c0.34,0.79,0.52,1.65,0.52,2.59 c0,1.18-0.27,2.28-0.83,3.3c-0.55,1.03-1.37,1.86-2.44,2.52c-1.08,0.65-2.35,1.04-3.83,1.16v1.05c0,0.61-0.06,1.05-0.18,1.33 c-0.12,0.28-0.37,0.42-0.78,0.42c-0.37,0-0.63-0.11-0.78-0.34c-0.15-0.23-0.22-0.58-0.22-1.06v-1.38 c-1.21-0.13-2.26-0.42-3.17-0.85c-0.9-0.43-1.66-0.97-2.26-1.62c-0.6-0.65-1.05-1.32-1.33-2.01c-0.29-0.7-0.43-1.39-0.43-2.05 c0-0.49,0.19-0.94,0.58-1.34c0.39-0.39,0.87-0.59,1.44-0.59c0.47,0,0.86,0.11,1.18,0.32c0.32,0.22,0.54,0.52,0.67,0.91 c0.28,0.85,0.52,1.49,0.72,1.95c0.21,0.45,0.52,0.86,0.94,1.23c0.42,0.37,0.97,0.66,1.66,0.85v-7.2c-1.39-0.39-2.54-0.81-3.47-1.28 c-0.93-0.47-1.68-1.13-2.26-2c-0.57-0.87-0.87-1.98-0.87-3.34c0-1.78,0.56-3.23,1.69-4.36c1.13-1.13,2.76-1.8,4.9-1.98v-1.01 c0-0.87,0.33-1.3,0.98-1.3C90.79,88.56,91.12,88.98,91.12,89.83L91.12,89.83L91.12,89.83z M89.15,99.82v-5.93 c-0.87,0.26-1.55,0.6-2.03,1.02c-0.49,0.42-0.73,1.07-0.73,1.93c0,0.81,0.23,1.43,0.68,1.85C87.53,99.1,88.22,99.48,89.15,99.82 L89.15,99.82L89.15,99.82z M91.12,104.41v6.79c1.04-0.21,1.84-0.62,2.41-1.25c0.56-0.64,0.85-1.37,0.85-2.2 c0-0.9-0.28-1.59-0.83-2.08C93,105.17,92.19,104.75,91.12,104.41L91.12,104.41L91.12,104.41z M69.43,19.97h2.26v12.17h-2.26V19.97 L69.43,19.97L69.43,19.97z M16.07,50.67h11.07c0.94,0,1.73,0.77,1.73,1.73v9.34c0,0.94-0.77,1.73-1.73,1.73H16.07 c-0.94,0-1.73-0.77-1.73-1.73V52.4C14.35,51.44,15.13,50.67,16.07,50.67L16.07,50.67L16.07,50.67z M16.07,95.07h11.07 c0.94,0,1.73,0.77,1.73,1.73v9.34c0,0.95-0.77,1.73-1.73,1.73H16.07c-0.94,0-1.73-0.77-1.73-1.73V96.8 C14.35,95.85,15.13,95.07,16.07,95.07L16.07,95.07L16.07,95.07L16.07,95.07z M16.07,72.87h11.07c0.94,0,1.73,0.77,1.73,1.73v9.34 c0,0.94-0.77,1.73-1.73,1.73H16.07c-0.94,0-1.73-0.77-1.73-1.73V74.6C14.35,73.64,15.13,72.87,16.07,72.87L16.07,72.87L16.07,72.87 z M65.12,50.67h11.06c0.94,0,1.72,0.77,1.72,1.73v5.43c-0.59,0.7-1.03,1.52-1.27,2.4c-0.75,0.5-1.51,1.07-2.17,1.71 c-0.49,0.47-0.94,0.98-1.34,1.53h-7.99c-0.94,0-1.73-0.77-1.73-1.73V52.4C63.39,51.44,64.17,50.67,65.12,50.67L65.12,50.67 L65.12,50.67z M65.12,72.87h7.36c0.25,0.43,0.55,0.85,0.89,1.27l0.01-0.01l3.53,4.23c-0.38,0.33-0.75,0.66-1.11,0.98l-0.72,0.63 l0.01,0.02l-0.04,0.03c-0.62,0.55-1.15,1.05-1.6,1.5c-0.61,0.6-1.12,1.14-1.55,1.62c-0.71,0.79-1.43,1.63-2.15,2.52h-4.64 c-0.94,0-1.73-0.77-1.73-1.73V74.6C63.39,73.64,64.17,72.87,65.12,72.87L65.12,72.87L65.12,72.87z M40.59,50.67h11.07 c0.94,0,1.73,0.77,1.73,1.73v9.34c0,0.94-0.77,1.73-1.73,1.73H40.59c-0.94,0-1.73-0.77-1.73-1.73V52.4 C38.87,51.44,39.64,50.67,40.59,50.67L40.59,50.67L40.59,50.67z M40.59,95.07h11.07c0.94,0,1.73,0.77,1.73,1.73v9.34 c0,0.95-0.77,1.73-1.73,1.73H40.59c-0.94,0-1.73-0.77-1.73-1.73V96.8C38.87,95.85,39.64,95.07,40.59,95.07L40.59,95.07L40.59,95.07 z'
                                    />
                                  </g>
                                </svg>
                              </div>
                              <div className='tw-mt-[12px]'>
                                <dl>
                                  <dt className='tw-font-bold tw-text-[15px] tw-text-black tw-text-left'>
                                    Service Request
                                  </dt>

                                  <div className='tw-mt-5'>
                                    <CustomTable
                                      title='All Candidates List'
                                      columns={columns3}
                                      data={enrollData.payload?.message}
                                      options={{
                                        actionsColumnIndex: -1,
                                        addRowPosition: 'first',
                                        selection: false,

                                        headerStyle: {
                                          backgroundColor: '#eaeffb',
                                          color: '#000',
                                        },
                                      }}
                                      onSelectionChange={(rows) =>
                                        setSelectedRows(rows)
                                      }
                                      actions={[
                                        (rowData) => ({
                                          icon: () => (
                                            <CheckIcon color={'success'} />
                                          ),
                                          tooltip: 'Approve',
                                          onClick: handleApprovePopup,
                                          hidden:
                                            rowData.status !== 'pending' ||
                                            rowData.type === 'sign',
                                        }),
                                        (rowData) => ({
                                          icon: () => (
                                            <CloseIcon color={'error'} />
                                          ),
                                          tooltip: 'Reject',
                                          onClick: handleRejectPopup,
                                          hidden:
                                            rowData.status !== 'pending' ||
                                            rowData.type === 'sign',
                                        }),
                                        (rowData) => ({
                                          icon: () => (
                                            <DataUsageIcon color={'warning'} />
                                          ),
                                          tooltip: 'generate Sign',
                                          onClick: handleFetchSignaturePopup,
                                          hidden: rowData.type === 'enroll',
                                        }),
                                      ]}
                                    />
                                  </div>
                                </dl>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <Dialog
                    open={isOpenDelete}
                    onClose={handleClose}
                    aria-labelledby='alert-dialog-title'
                    aria-describedby='alert-dialog-description'
                  >
                    <DialogTitle id='alert-dialog-title'>Delete</DialogTitle>
                    <DialogContent>
                      Are you sure you want to delete it ?
                    </DialogContent>
                    <DialogActions>
                      <Button
                        onClick={handleClose}
                        variant='outlined'
                        color='error'
                        autoFocus
                      >
                        No
                      </Button>
                      <Button
                        onClick={handleDelete}
                        variant='contained'
                        color='success'
                        autoFocus
                      >
                        Yes
                      </Button>
                    </DialogActions>
                  </Dialog>

                  <Dialog
                    open={isOpenConfirm}
                    onClose={handleClose}
                    aria-labelledby='alert-dialog-title'
                    aria-describedby='alert-dialog-description'
                  >
                    <DialogTitle id='alert-dialog-title'>Confirm</DialogTitle>
                    <DialogContent>Do you want to confirm it ?</DialogContent>
                    <DialogActions>
                      <Button
                        onClick={handleClose}
                        variant='outlined'
                        color='error'
                        autoFocus
                      >
                        No
                      </Button>
                      <Button
                        onClick={handleConfirm}
                        variant='contained'
                        color='success'
                        autoFocus
                      >
                        Yes
                      </Button>
                    </DialogActions>
                  </Dialog>

                  <Dialog
                    open={isOpenApprove}
                    onClose={handleClose}
                    aria-labelledby='alert-dialog-title'
                    aria-describedby='alert-dialog-description'
                  >
                    <DialogTitle id='alert-dialog-title'>Approve</DialogTitle>
                    <DialogContent>Do you want to approve it ?</DialogContent>
                    <DialogActions>
                      <Button
                        onClick={handleClose}
                        variant='outlined'
                        color='error'
                        autoFocus
                      >
                        No
                      </Button>
                      <Button
                        onClick={handleApprove}
                        variant='contained'
                        color='success'
                        autoFocus
                      >
                        Yes
                      </Button>
                    </DialogActions>
                  </Dialog>

                  <Dialog
                    open={isOpenReject}
                    onClose={handleClose}
                    aria-labelledby='alert-dialog-title'
                    aria-describedby='alert-dialog-description'
                  >
                    <DialogTitle id='alert-dialog-title'>Reject</DialogTitle>
                    <DialogContent>Do you want to reject it ?</DialogContent>
                    <DialogActions>
                      <Button
                        onClick={handleClose}
                        variant='outlined'
                        color='error'
                        autoFocus
                      >
                        No
                      </Button>
                      <Button
                        onClick={handleReject}
                        variant='contained'
                        color='success'
                        autoFocus
                      >
                        Yes
                      </Button>
                    </DialogActions>
                  </Dialog>

                  {/* Fetch Signature Popup*/}

                  <Dialog
                    open={isOpenFetchSignature}
                    onClose={handleClose}
                    aria-labelledby='alert-dialog-title'
                    aria-describedby='alert-dialog-description'
                  >
                    <DialogTitle id='alert-dialog-title'>
                      {'Enter your Wallet Address to fetch signature'}
                    </DialogTitle>
                    <DialogContent>{RecoveryMessage}</DialogContent>
                    <DialogActions>
                      <Button onClick={generateSignatur} autoFocus>
                        Done
                      </Button>
                    </DialogActions>
                  </Dialog>

                  {/* get Signature Dialog*/}

                  <Dialog
                    open={OpenSignatureData}
                    onClose={handleClose}
                    aria-labelledby='alert-dialog-title'
                    aria-describedby='alert-dialog-description'
                    style={{ boxShadow: '0 10px 5px 10px black' }}
                  >
                    <DialogTitle id='alert-dialog-title'>
                      {'Signature'}
                    </DialogTitle>
                    <DialogContent
                      style={{
                        width: '30vw',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography>Sign_Data:&nbsp;&nbsp;{sigData}</Typography>
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
export default withRouter(AdminDashboard);
