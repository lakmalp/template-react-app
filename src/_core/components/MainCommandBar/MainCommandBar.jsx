import React, { useContext } from "react"
import { IconRefresh, IconSignout, IconSignoutCircle } from '../../utilities/svg-icons';
import { useParams } from "react-router-dom";
import EventBus from "../../utilities/event-bus";
import AuthContext from "../../providers/AuthContext";
import { Button } from "../index"

const MainCommandBar = () => {
  let auth = useContext(AuthContext);
  let id = useParams().id;

  const refresh = () => {
    EventBus.dispatch("loadHeader", id);
  }
  const logout = () => {
    auth.logout();
  }

  return (
    <div className="flex justify-end items-center w-full">
      <Button
        variant="primary"
        className="mr-2 h-7 px-2"
        text="Refresh"
        callback={() => refresh()}
        icon={{ component: <IconRefresh />, width: 10, color: "white" }}
      />
      <Button
        variant="danger"
        className="h-7 px-2"
        text="Signout"
        disabled={auth.isAuthWaiting}
        animate={auth.isAuthWaiting}
        callback={() => logout()}
        icon={{ component: <IconSignoutCircle />, width: 15, color: "white" }}
      />
    </div>
  )
}

export default MainCommandBar