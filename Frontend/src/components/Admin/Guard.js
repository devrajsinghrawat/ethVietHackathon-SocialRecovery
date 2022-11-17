import React from "react";
import { withRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import FooterAdmin from "./FooterAdmin";
import TopBarAdmin from "./TopBarAdmin";
import SideBarAdmin from "./SideBarAdmin";

import CustomTable from "../CustomTable";

import "react-toastify/dist/ReactToastify.css";

const Guard = () => {
  const columns = [
    { title: "Timestamp", field: "Timestamp" },
    { title: "Address", field: "Address" },
    { title: "SM", field: "SM" },
    { title: "Last Activity", field: "LastActivity" },
  ];

  const data = [];

  const handleBulkDelete = () => {};

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
                              selection: true,

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
