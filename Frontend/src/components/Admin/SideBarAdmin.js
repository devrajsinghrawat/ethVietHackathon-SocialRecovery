import React from "react";
import { Link, useLocation } from "react-router-dom";
import { clsx } from "clsx";

export default function SideBarAdmin() {
  const UserKey = localStorage.getItem("id");
  console.log("UserKey", UserKey);

  const { pathname } = useLocation();

  return (
    <>
      <ul
        className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        <Link
          className="sidebar-brand d-flex align-items-center justify-content-center"
          to="/dashboard"
        >
          <div className="sidebar-brand-icon rotate-n-15">
            {/* <i className="fas fa-laugh-wink"></i> */}
            {/* <img src={image} height={60} width={60} /> */}
          </div>
          <div className="sidebar-brand-text whitespace-nowrap">
            Social Recovery DAO <sup></sup>
          </div>
        </Link>

        <hr className="my-0 sidebar-divider" />

        <li
          className={clsx(
            {
              active: pathname === "/dashboard",
            },
            "nav-item"
          )}
        >
          <Link className="nav-link" to="/dashboard">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </Link>
        </li>

        <li
          className={clsx(
            {
              active: pathname === "/enroll",
            },
            "nav-item"
          )}
        >
          <Link className="nav-link" to="/enroll">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>Enroll</span>
          </Link>
        </li>

        <li
          className={clsx(
            {
              active: pathname === "/guard",
            },
            "nav-item"
          )}
        >
          <Link className="nav-link" to="/guard">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>Guard</span>
          </Link>
        </li>

        <hr className="sidebar-divider" />
      </ul>
    </>
  );
}
