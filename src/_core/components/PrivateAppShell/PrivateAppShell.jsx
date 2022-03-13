import React, { useContext, useRef, useState } from "react";
import { Route, Routes, Outlet } from "react-router-dom";
import { ApiWaiting, BreadCrumbs, Loader, MainCommandBar, ToastContainer, Sidebar,Button } from "..";
import { DialogBoxProvider } from "../../providers/DialogBoxContext";
import GlobalStateContext from "../../providers/GlobalStateContext";
import { ToastProvider } from "../../providers/ToastContext";
import { DialogBoxContainer } from "../DialogBox";
import base_routes from "../../base-routes"
import app_routes from "../../../app/routes"
import { IconRefresh, IconSidebar } from "../../utilities/svg-icons";

const PrivateAppShell = (props) => {
  let globalState = useContext(GlobalStateContext);
  let _routes = [];
  let hasRootRef = useRef(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

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
            {!sidebarCollapsed && <Sidebar />}
            <div className=" w-full">
              <div className='w-full flex justify-between items-center px-2 h-10 border-b shadow'>
                <Button
                  variant="primary"
                  className=" px-1 "
                  text=""
                  callback={() => setSidebarCollapsed(prev => !prev)}
                  icon={{ component: <IconSidebar />, width: 20 }}
                />
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