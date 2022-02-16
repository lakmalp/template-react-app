import React, { useState, useEffect, useContext } from "react"
import {  IconRefresh, IconSignout, IconLoading } from '../../utilities/svg-icons';
import EventBus from "../../utilities/event-bus";
import AuthContext from "../../providers/AuthContext";

const MainCommandBar = () => {
  let auth = useContext(AuthContext);

  const refresh = () => {
    EventBus.dispatch("loadHeader", "");
  }
  const logout = () => {
    auth.logout();
  }

  return (
    <div className="flex items-center">
      <button className='py-1 text-xs font-roboto font-semibolda shadow-mda border border-gray-300 bg-gradient-to-b from-gray-200 to-gray-300 hover:from-gray-300 rounded' onClick={() => refresh()}>
        <div className='flex items-center mx-2'>          
          <IconRefresh width="10" color="black" className="mr-2" />Refresh
        </div>
      </button>
      <button
        className={'ml-2 py-1 text-xs font-roboto font-semibolda rounded ' + (auth.isAuthWaiting ? "bg-gray-600" :"shadow-mda border border-red-300 bg-gradient-to-b from-gray-100 to-gray-200 hover:from-red-300 hover:to-red-400")}
        onClick={() => logout()}
        disabled={auth.isAuthWaiting }
      >
        <div className='flex items-center mx-2'>
          {
            auth.isAuthWaiting
              ? <IconLoading className="animate-spin" width="10" color="black" />
              : <><IconSignout width="10" color="#000" className="mr-2" />Signout</>
          }
        </div>
      </button>
    </div>
  )
}

export default MainCommandBar