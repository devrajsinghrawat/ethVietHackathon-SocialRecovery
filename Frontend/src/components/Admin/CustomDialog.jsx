import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core'
import React from 'react'
import { Button } from 'react-bootstrap'

function CustomDialog({open,handleClose,value,onClickFun}) {
  return (
   <>
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
                  <TextField id="outlined-basic" value={value}  variant="outlined"  style={{width:"300px",height:"70px",marginTop:"10px"}}
                  onChange={(e)=>setWalletInfo(e)} />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={Enroll} autoFocus>
                      Done
                    </Button>
                  </DialogActions>
                </Dialog>
   
   </>
  )
}

export default CustomDialog