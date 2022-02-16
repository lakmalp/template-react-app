import { useContext, useEffect, useRef, useState } from "react"
import { IconKey, IconLoading } from "../../utilities/svg-icons"
import { AuthContext } from "../../providers/AuthContext";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const emailRef = useRef()
  const auth = useContext(AuthContext);
  const [focussedEl, setFocussedEl] = useState("email");
  const [data, setData] = useState({})
  
  const login = async () => {
    await auth.login(data.email, data.password);
  }

  useEffect(() => {
    emailRef.current.focus();
  }, [])

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="container mx-auto" style={{ paddingTop: "calc((100vh)/5)", height: "calc(100vh)" }}>
      <div className="relative mx-auto bg-gray-100 rounded-2xl shadow-md pt-14 max-w-xs pb-2 pl-2 pr-2">
        <div className=" flex justify-center items-center">
          <IconKey className="absolute -mt-6 p-0 " width="55" color="rgb(59, 130, 246)" />
        </div>
        <div className={"mt-20 bordera border-ss-300 rounded-md "}>
          <label className={"block font-montserrat text-xs font-semibold mb-1 text-gray-600"}>Email</label>
          <input
            value={data.email || ''}
            onChange={(e) => setData(prev => ({...prev, email: e.target.value}))}
            ref={emailRef}
            type="text"
            disabled={auth.isPingingServer || auth.isAuthWaiting}
            className={"h-8 w-full font-inter border rounded px-1 focus:outline-none mt-0 text-gray-600"}
            onFocus={() => setFocussedEl("email")}
          />
        </div>
        <div className={"mt-3 bordera border-ss-300 rounded-md "}>
          <label className={"block font-montserrat text-xs font-semibold mb-1 text-gray-600"}>Password</label>
          <input
            value={data.password || ''}
            onChange={(e) => setData(prev => ({ ...prev, password: e.target.value }))}
            type="password"
            disabled={auth.isPingingServer || auth.isAuthWaiting}
            className={"h-8 w-full font-inter border rounded px-1 focus:outline-none mt-0 text-gray-600"}
            onFocus={() => setFocussedEl("password")}
          />
        </div>
        <div className={"my-3 mx-1 text-xs font-inter p-1 rounded bg-whitea text-red-500 " + (["pending", "success"].includes(auth.status) ? "hidden" : "")}>
          {auth.authErr}
        </div>
        <div className="flex justify-between items-center mt-3 px-1">
          <div className={"text-xs font-inter rounded text-green-500 "} >
            <span className={auth.isPingingServer ? "" : "hidden"}>
              <IconLoading className="animate-spin-slow" width="18" color="rgb(59, 59, 59)" />
            </span>
          </div>
          <button
            className={"flex justify-between items-center py-2 font-semibold px-3 rounded-t-md rounded-bl-md rounded-br-md font-montserrat text-xs text-white " + (auth.isAuthWaiting ? "bg-gray-600 cursor-default" : " bg-gray-800 hover:bg-gray-900 hover:shadow")}
            disabled={auth.isAuthWaiting}
            onClick={() => login()}
          >
            {auth.isAuthWaiting && <IconLoading className="animate-spin mr-2" width="15" color="white" />}
            Sign In
          </button>
        </div>
      </div>
      </div>
      </>
  )
}

export default Login