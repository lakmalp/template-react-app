import { useContext, useEffect, useRef, useState } from "react"
import { IconKey, IconLoading } from "../../utilities/svg-icons"
import { AuthContext } from "../../providers/AuthContext";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const emailRef = useRef()
  const auth = useContext(AuthContext);
  const [focussedEl, setFocussedEl] = useState("email");
  const [data, setData] = useState({email:"", password:""})
  const [fieldsDisabled, setFieldsDisabled] = useState(true);
  const [loginDisabled, setLoginDisabled] = useState(true);
  const { isPingingServer, isAuthWaiting, authError } = auth;
  const [err, setErr] = useState()

  const login = async () => {
    await auth.login(data.email, data.password);
  }

  useEffect(() => {
    if (["Network Error", "Unauthenticated."].includes(authError)) {
      setErr(authError)
    } else {
      setErr(authError.email)
    }
  }, [authError])

  useEffect(() => {
    setFieldsDisabled(isPingingServer || isAuthWaiting || (authError === "Network Error"))
    setLoginDisabled(isPingingServer || isAuthWaiting || !data || (data.email === "") || (data.password === ""))
  }, [isPingingServer, isAuthWaiting, authError, data])

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
          <div className={"mt-20 bordera border-gray-300 rounded-md "}>
            <label className={"block font-montserrat text-xs font-semibold mb-1 text-gray-600"}>Email</label>
            <input
              value={data?.email || ''}
              onChange={(e) => setData(prev => ({ ...prev, email: e.target.value }))}
              ref={emailRef}
              type="text"
              disabled={fieldsDisabled}
              className={"h-8 w-full font-inter border rounded px-1 focus:outline-none mt-0 text-gray-600"}
              onFocus={() => setFocussedEl("email")}
              autoFocus
            />
          </div>
          <div className={"mt-3 border-gray-300 rounded-md "}>
            <label className={"block font-montserrat text-xs font-semibold mb-1 text-gray-600"}>Password</label>
            <input
              value={data?.password || ''}
              onChange={(e) => setData(prev => ({ ...prev, password: e.target.value }))}
              type="password"
              disabled={fieldsDisabled}
              className={"h-8 w-full font-inter border rounded px-1 focus:outline-none mt-0 text-gray-600"}
              onFocus={() => setFocussedEl("password")}
            />
          </div>
          <div className={"my-3 mx-1 text-xs font-inter py-1 rounded bg-whitea text-red-500 " + (authError && (authError !== "Unauthenticated.") ? "" : "hidden")}>
            {err}
          </div>
          <div className="flex justify-between items-center mt-3 px-1">
            <div className={"text-xs font-inter rounded text-green-500 "} >
              <span className={(isPingingServer || isAuthWaiting) ? "" : "hidden"}>
                <IconLoading className="animate-spin" width="18" color="rgb(59, 59, 59)" />
              </span>
            </div>
            <button
              className={"flex justify-center items-center py-2 font-semibold w-24 rounded-md font-montserrat text-xs text-white " + (loginDisabled ? "bg-gray-300 cursor-default" : " bg-gray-800 hover:bg-gray-900 hover:shadow")}
              disabled={loginDisabled}
              onClick={() => login()}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login