import React, { useContext, useRef } from "react";
import { Route, Routes, Outlet } from "react-router-dom";
import { ApiWaiting, BreadCrumbs, Loader, MainCommandBar, ToastContainer, Sidebar } from "..";
import { DialogBoxProvider } from "../../providers/DialogBoxContext";
import GlobalStateContext from "../../providers/GlobalStateContext";
import { ToastProvider } from "../../providers/ToastContext";
import { DialogBoxContainer } from "../DialogBox";
import base_routes from "../../base-routes"
import app_routes from "../../../app/routes"

const PrivateAppShell = (props) => {
  let globalState = useContext(GlobalStateContext);
  let _routes = [];
  let hasRootRef = useRef(false);

  hasRootRef.current = app_routes.reduce((acc, cur) => {
    acc = acc || (cur.path === '/')
    return acc
  }, false)

  if (hasRootRef.current) {
    _routes = [...base_routes.filter(item => item.path !== '/'), ...app_routes]
  } else {
    _routes = [...base_routes, ...app_routes]
  }

  return (
    <>
      <DialogBoxProvider>
        <ToastProvider>
          <ToastContainer />
          <DialogBoxContainer />
          <div className='flex h-screen '>
            <Sidebar />
            <div className=" w-full">
              <div className='flex justify-between items-center bg-white px-2 h-10 border-b'>
                <BreadCrumbs />
                <MainCommandBar />
              </div>
              <div className='overflow-y-auto' style={{ maxHeight: 'calc(100vh - 40px)' }}>
                {(typeof globalState.loadingSource !== 'undefined') && <ApiWaiting />}
                <React.Suspense fallback={<Loader />}>
                  {props.children}
                </React.Suspense>
              </div>
            </div>
          </div>
        </ToastProvider>
      </DialogBoxProvider>
    </>
  )
}

export const LazyComponent = (props) => {
  let Comp = React.lazy(() => import("./" + props.folder + "/" + props.page))
  return (
    <Comp {...props} />
  )
}

export default PrivateAppShell;