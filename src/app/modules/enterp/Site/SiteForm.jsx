import { useEffect, useState, useContext } from "react";
import { Button, TextField } from "../../../../_core/components";
import { DialogBoxConstants } from "../../../../_core/components/DialogBox/DialogBoxPlaceholder";
import { formatDate } from "../../../../_core/utilities/date-formatting";
import { IconLoading, IconSave, IconTickInCircle } from "../../../../_core/utilities/svg-icons";
import site_api from "./site_api";
import { decodeError } from "../../../../_core/utilities/exception-handler";
import { useNavigate } from "react-router-dom";
import GlobalStateContext from "../../../../_core/providers/GlobalStateContext";

const SiteForm = (props) => {
  const globalState = useContext(GlobalStateContext)
  let navigate = useNavigate();
  const [localData, setLocalData] = useState(props.data);
  const [status, setStatus] = useState("")
  const [error, setError] = useState()
  const { mode } = props

  useEffect(() => {
    if (mode === "edit") {
      // setLocalData(prev => ())
    } else if (mode === "create") {
      globalState.write("activeDataSource", "Site")
      let res = '';
      (async () => {
        setStatus("loading")
        res = await site_api.prepareCreate();
        setLocalData({ ...res.data.data })
        setStatus("")
      })();
    }
  }, [mode])

  const save = async (redirect) => {
    try {
      setStatus("waiting")
      if (typeof localData.id === 'undefined') {
        let res = await site_api.create(localData)
        setStatus("success")
        if (redirect) {
          navigate(`/enterp/sites/${res.data.data.id}`);
          props.callback(DialogBoxConstants.Result.Ok, { redirect: true, content: res.data.data })
        } else {
          props.callback(DialogBoxConstants.Result.Ok, { redirect: false, content: res.data.data })
        }
      } else {
        let res = await site_api.update(props.data.id, localData)
        setStatus("success")
        props.callback(DialogBoxConstants.Result.Ok, res.data.data)
      }
    } catch (err) {
      setStatus("error");
      setError(JSON.parse(decodeError(err)));
    }
  }

  const onChange = (e) => {
    setLocalData(prev => {
      return (
        { ...prev, [e.target.name]: e.target.value }
      )
    })
  }

  return (
    <div className={" bg-white " + props.className}>
      <div className="flex font-roboto text-md font-semibolda text-ss-900 px-2 py-2">
        <div className="px-2  bg-sky-600 text-white">{(["loading", "waiting"].includes(status)) && <IconLoading width="15" color="blue" className="ml-2 animate-spin" />}</div>
      </div>
      <div className="font-inter px-2 grid gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mb-2 pt-4">
        <div className=" 2xl:col-span-2">
          <label className="block text-xs pb-1">Code</label>
          <TextField
            apiError={error}
            name="code"
            value={localData?.code ? localData.code : ""}
            title="Code"
            disabled={false}
            className="text-gray-800 text-sm col-span-2"
            textAlign="left"
            onChangeCallback={onChange}
            onBlurCallback={() => { }}
          />
        </div>
        <div className=" 2xl:col-span-3">
          <label className="block text-xs pb-1">Description</label>
          <TextField
            apiError={error}
            name="description"
            value={localData?.description ? localData.description : ""}
            title="Description"
            disabled={false}
            className="text-gray-800 text-sm col-span-2"
            textAlign="left"
            onChangeCallback={onChange}
            onBlurCallback={() => { }}
          />
        </div>
      </div>
      <div className={"bg-ss-100 flex items-center w-full p-2 mt-6 justify-end"}>
          {
            (props.mode === "new") &&
            <Button
              text="Save & Close"
              disabled={["waiting", "success", "loading"].includes(status) ? true : false}
              callback={() => save()}
              className="px-2"
            />
          }
          <Button
            type="button"
          text={(props.mode === "edit" ? "Save" : "Save & Open")}
            disabled={["waiting", "success", "loading"].includes(status) ? true : false}
            callback={() => save(true)}
            // icon={{ component: (status === "success" ? <IconTickInCircle /> : <IconSave />), width: 13, color: "#eee" }}
            className="px-2 ml-2"
          />
      </div>
    </div>
  )
}

export default SiteForm;