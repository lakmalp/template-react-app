import React from "react";
import { TextField } from "../../components";

const UserProfileForm = ({ data, setData }) => {

  const onUserDataChanged = (e) => {
    setData(prev => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  return (
    <section className="mb-4">
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-2">
          <label className="block font-roboto text-xs text-gray-500 font-semibold">Name:</label>
          <TextField
            name="name"
            value={data ? data.name : ""}
            title="Name"
            disabled={false}
            className="text-gray-800 text-sm w-full"
            textAlign="left"
            onChangeCallback={onUserDataChanged}
            onBlurCallback={null}
          />
        </div>
        <div className="col-span-2">
          <label className="block font-roboto text-xs text-gray-500 font-semibold">Email:</label>
          <TextField
            name="email"
            value={data ? data.email : ""}
            title="Email"
            disabled={false}
            className="text-gray-800 text-sm w-full"
            textAlign="left"
            onChangeCallback={onUserDataChanged}
            onBlurCallback={null}
          />
        </div>
        <div className="">
          <label className="block font-roboto text-xs text-gray-500 font-semibold">Telephone No:</label>
          <TextField
            name="tel_no"
            value={data ? data.tel_no : ""}
            title="Telephone No"
            disabled={false}
            className="text-gray-800 text-sm w-full"
            textAlign="left"
            onChangeCallback={onUserDataChanged}
            onBlurCallback={null}
          />
        </div>
        <div className="col-span-3">
          <label className="block font-roboto text-xs text-gray-500 font-semibold">Address:</label>
          <TextField
            name="address"
            value={data ? data.address : ""}
            title="Address"
            disabled={false}
            className="text-gray-800 text-sm w-full"
            textAlign="left"
            onChangeCallback={onUserDataChanged}
            onBlurCallback={null}
          />
        </div>
      </div>
    </section>
  )
}

export default UserProfileForm;