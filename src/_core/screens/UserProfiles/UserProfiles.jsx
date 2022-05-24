import React, { useState, useRef, useEffect } from "react"
import { Helmet } from "react-helmet-async";
import user_profile_api from "../../api/user_profile_api";
import { Button, TextField } from "../../components";
import { IconChevronRight, IconDropDown } from "../../utilities/svg-icons"
import UserProfileForm from "./UserProfileForm";

const UserProfiles = () => {
  const [selectedRow, setSelectedRow] = useState()
  const [isCreating, setIsCreating] = useState(false);
  const [users, setUsers] = useState();
  const [selectedUser, setSelectedUser] = useState();
  const [isNewUserMode, setIsNewUserMode] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [newUserData, setNewUserData] = useState();
  const pageSize = useRef(10);

  const getList = async () => {
    let user_res = await user_profile_api.list({ page_no: pageNo, page_size: pageSize.current });
    setUsers(user_res.data.data);
  }

  const getUserProfile = async (id) => {
    let user_res = await user_profile_api.get(id);
    setSelectedUser(user_res.data.data[0]);
  }

  const update = async () => {

  }

  const create = async () => {
    setIsCreating(true);
    let res = await user_profile_api.create(newUserData);
    setIsCreating(false);
    (async () => {
      getList();
    })();
    setSelectedRow(0);
  }

  useEffect(() => {
    if ((typeof selectedRow !== 'undefined') && users) {
      getUserProfile(users[selectedRow].id);
    }
  }, [selectedRow, users])

  useEffect(() => {
    (async () => {
      getList();
    })();
    setSelectedRow(0);
  }, [])

  return (
    <>
      <Helmet>
        <title>User Profiles</title>
      </Helmet>
      <section className="p-2">
        <div className="grid gap-2 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          <div className="col-span-2">
            <div className="mb-2 rounded border">
              <div onClick={() => setIsNewUserMode(prev => !prev)} className="font-roboto font-semibold text-xs p-2 bg-gray-100 flex justify-between">
                <span>Create New User</span>
                <IconDropDown width="12" color="black" />
              </div>
              <div className={isNewUserMode ? "p-2" : "hidden"}>
                <UserProfileForm data={newUserData} setData={setNewUserData} />
                <section className="flex justify-end">
                  <Button
                    type="link"
                    text="Cancel"
                    disabled={isCreating}
                    callback={() => {
                      setNewUserData()
                      setIsNewUserMode(prev => !prev)
                    }}
                    animate={false}
                    className="h-7 px-3"
                  />
                  <Button
                    type="button"
                    text="Create"
                    disabled={isCreating}
                    callback={() => create()}
                    animate={isCreating}
                    variant="warning"
                    className="h-7 px-3"
                  />
                </section>
              </div>
            </div>
          </div>
          <div className="col-start-1">
            <div className="font-roboto text-sm py-1 px-1 font-semibold bg-gray-100 text-gray-500 text-center">Users List</div>
            <div className={"grid grid-cols-6  "}>
              <div className="p-1"></div>
              <div className="col-span-4 p-1 flex justify-between items-center text-xs text-gray-600 font-roboto font-semibold">Name</div>
            </div>
            <UserList data={users} selectedRow={selectedRow} setSelectedRow={setSelectedRow} />
          </div>
          <div className="">
            <div className="font-roboto text-sm py-1 px-1 font-semibold bg-gray-100 text-gray-500 text-center mb-2">Profile</div>
            {selectedUser && <User data={selectedUser} setData={setSelectedUser} isNewUserMode={isNewUserMode} />}
          </div>
        </div>
      </section>
    </>
  );
}

const UserList = ({ data, selectedRow, setSelectedRow }) => {
  if (data) {
    return (
      data.map(
        (item, rownum) => <UserListItem key={rownum} data={item} rownum={rownum} currentRow={selectedRow} setSelectedRow={setSelectedRow} />
      )
    )
  }
  return (<></>);

}

const UserListItem = ({ data, rownum, currentRow, setSelectedRow }) => {
  return (
    <div onClick={() => setSelectedRow(rownum)} className={"grid grid-cols-6 text-sm font-roboto hover:bg-yellow-100 text-gray-700 " + ((rownum === currentRow) ? "bg-gray-100" : "")}>
      <div className="p-1">{rownum + 1}</div>
      <div className="col-span-5 p-1 flex justify-between items-center">
        <span>{data.name}</span>
        {
          (rownum === currentRow) && <span><IconChevronRight color="rgb(99, 102, 241)" width="15" /></span>
        }
      </div>
    </div>
  )
}

const User = ({ data, setData, isNewUserMode }) => {

  const onUserChanged = (e) => {
    setData(prev => {
      return {...prev, [e.target.name]: e.target.value}
    })
  }

  return (
    <>
      <div className="bg-gray-100a grid grid-cols-3 gap-2">
        <label className="pr-2 font-roboto text-sm text-gray-600">ID:</label>
        <TextField
          name="id"
          value={data.id}
          title="ID"
          disabled={true}
          className="text-gray-800 text-sm col-span-2"
          textAlign="left"
          onChangeCallback={onUserChanged}
          onBlurCallback={null}
        />
        <label className="pr-2 font-roboto text-sm text-gray-700">Name:</label>
        <TextField
          name="name"
          value={data.user.name}
          title="Name"
          disabled={isNewUserMode || (data.user.email === 'admin@domain.com')}
          className="text-gray-800 text-sm col-span-2"
          textAlign="left"
          onChangeCallback={onUserChanged}
          onBlurCallback={null}
        />
        <label className="pr-2 font-roboto text-sm text-gray-700">Email:</label>
        <TextField
          name="email"
          value={data.user.email}
          title="Email"
          disabled={isNewUserMode || (data.user.email === 'admin@domain.com')}
          className="text-gray-800 text-sm col-span-2"
          textAlign="left"
          onChangeCallback={onUserChanged}
          onBlurCallback={null}
        />
        <label className="pr-2 font-roboto text-sm text-gray-700">Telephone No:</label>
        <TextField
          name="tel_no"
          value={data.tel_no}
          title="Telephone No"
          disabled={isNewUserMode}
          className="text-gray-800 text-sm col-span-2"
          textAlign="left"
          onChangeCallback={onUserChanged}
          onBlurCallback={null}
        />
        <label className="pr-2 font-roboto text-sm text-gray-700">Address:</label>
        <TextField
          name="address"
          value={data.address}
          title="Address"
          disabled={isNewUserMode}
          className="text-gray-800 text-sm col-span-2"
          textAlign="left"
          onChangeCallback={onUserChanged}
          onBlurCallback={null}
        />
        <section className="col-span-3 flex justify-end">
          <Button
            type="button"
            text="Save"
            disabled={isNewUserMode}
            callback={null}
            animate={false}
            variant="warning"
            className="h-7 px-3"
          />
        </section>
      </div>
    </>
  )
}

export default UserProfiles;