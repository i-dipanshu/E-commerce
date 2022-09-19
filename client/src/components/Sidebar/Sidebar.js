import React from "react";
import { push as Menu } from "react-burger-menu";
import "./Sidebar.css";

export default (props) => {
  return (
    // Pass on our props
    <div>
      <Menu {...props}>
        <div className="mb-5">
          <a
            href="#"
            className="flex items-center p-2 text-base font-normal rounded-lg"
          >
            <svg
              aria-hidden="true"
              className="w-6 h-6 transition duration-75 "
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
              <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
            </svg>
            <span className="ml-3">Collections</span>
          </a>
        </div>


        <div className="mb-5">
          <a
            href="#"
            className="flex items-center p-2 text-base font-normal rounded-lg"
          >
            <svg
              aria-hidden="true"
              className="w-6 h-6 transition duration-75 "
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
              <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
            </svg>
            <span className="ml-3">Brands</span>
          </a>
        </div>

        <div className="mb-5">
          <a
            href="#"
            className="flex items-center p-2 text-base font-normal rounded-lg"
          >
            <svg
              aria-hidden="true"
              className="w-6 h-6 transition duration-75 "
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
              <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
            </svg>
            <span className="ml-3">New</span>
          </a>
        </div>

        <div className="mb-5">
          <a
            href="#"
            className="flex items-center p-2 text-base font-normal rounded-lg"
          >
            <svg
              aria-hidden="true"
              className="w-6 h-6 transition duration-75 "
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
              <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
            </svg>
            <span className="ml-3">Sales</span>
          </a>
        </div>

        <div className="mb-5">
          <a
            href="#"
            className="flex items-center p-2 text-base font-normal rounded-lg"
          >
            <svg
              aria-hidden="true"
              className="w-6 h-6 transition duration-75 "
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
              <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
            </svg>
            <span className="ml-3">Orders</span>
          </a>
        </div>
      </Menu>
    </div>
  );
};
