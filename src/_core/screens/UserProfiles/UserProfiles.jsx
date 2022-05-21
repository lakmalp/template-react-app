import React, { useState, useRef, useEffect } from "react"
import { Helmet } from "react-helmet-async";
import user_profile_api from "../../api/user_profile_api";
import { TextBox, Button } from "../../components";
import { IconChevronRight, IconDropDown } from "../../utilities/svg-icons"

const UserProfiles = () => {
  const [selectedRow, setSelectedRow] = useState(0)
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [isNewUserMode, setIsNewUserMode] = useState(false);
  // let users = [
  //   { id: 1, username: "lakmalp", type: "Admin", name: "Lakmal", email: "lakmalp@gmail.com" },
  //   { id: 2, username: "suneth", type: "Admin", name: "Suneth", email: "sunethier@gmail.com" },
  //   { id: 3, username: "tintin", type: "EndUser", name: "Tintin", email: "tintin@yahoo.com" },
  //   { id: 4, username: "kaboom", type: "EndUser", name: "Kaboom", email: "kaboom@msn.com" },
  //   { id: 5, username: "lettuce", type: "EndUser", name: "Lettuce", email: "lettuce007@gmail.com" }
  // ];

  const index = async () => {
    let user_res = await user_profile_api.index();
    setUsers(user_res.data.data);
    setIsLoading(false);
  }

  const update = async () => {

  }

  useEffect(() => {
    index();
  }, [])

  return (
    <>
      <Helmet>
        <title>User Profiles</title>
      </Helmet>
      <section className="p-2">        
        <div className="grid gap-2 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          <div className="col-span-2">
            <div onClick={() => setIsNewUserMode(prev => !prev)} className="mb-2 rounded border">
              <div className="font-roboto font-semibold text-xs p-2 bg-gray-100 flex justify-between">
                <span>Create New User</span>
                <IconDropDown width="12" color="black"/>
              </div>
              <div className={isNewUserMode ? "p-2" : "hidden"}>
                <Button
                  type="button"
                  text="Save"
                  disabled={false}
                  callback={null}
                  animate={false}
                  variant="warning"
                  className="h-7 px-3"
                />
              </div>
            </div>
          </div>
          <div className="col-start-1">
            <div className={"grid grid-cols-6 text-gray-800 text-sm font-roboto font-semibold "}>
              <div className="p-1"></div>
              <div className="p-1">ID</div>
              <div className="col-span-4 p-1 flex justify-between items-center">Name</div>
            </div>
            {
              isLoading ?
                "Loading..."
                :
                <UserList data={users} selectedRow={selectedRow} setSelectedRow={setSelectedRow} />
            }

          </div>
          <div>
            {
              isLoading ?
                ""
                :
                <User data={users.filter((item, i) => (i === selectedRow))[0]} />
            }
          </div>
        </div>
      </section>
    </>
  );
}

const UserList = ({ data, selectedRow, setSelectedRow }) => {
  return (
    data.map((item, rownum) => {
      return (
        <>
          <UserListItem data={item} rownum={rownum} currentRow={selectedRow} setSelectedRow={setSelectedRow} />
        </>
      )
    })
  )
}

const UserListItem = ({ data, rownum, currentRow, setSelectedRow }) => {
  return (
    <div onClick={() => setSelectedRow(rownum)} className={"grid grid-cols-6 text-sm font-roboto hover:bg-yellow-100 text-gray-700 " + ((rownum === currentRow) ? "bg-gray-100" : "")}>
      <div className="p-1">{rownum + 1}</div>
      <div className="p-1">{data.id}</div>
      <div className="col-span-4 p-1 flex justify-between items-center">
        <span>{data.name}</span>
        {
          (rownum === currentRow) &&
          <span><IconChevronRight color="rgb(99, 102, 241)" width="15" /></span>
        }
      </div>
    </div>
  )
}

const User = ({ data }) => {
  const [isEditMode, setIsEditMode] = useState(true);
  const onUserChanged = () => { }
  return (
    <>
      <div className="bg-gray-100 p-2 grid grid-cols-3 gap-2">
        <label className="pr-2 font-roboto text-sm text-gray-600">ID:</label>
        <TextBox
          value={data.id}
          title="ID"
          disabled={true}
          className="text-gray-800 text-sm col-span-2"
          textAlign="left"
          onChangeCallback={onUserChanged}
          onBlurCallback={null}
        />
        <label className="pr-2 font-roboto text-sm text-gray-700">Name:</label>
        <TextBox
          value={data.user.name}
          title="Name"
          disabled={!isEditMode || (data.user.email === 'admin@domain.com')}
          className="text-gray-800 text-sm col-span-2"
          textAlign="left"
          onChangeCallback={onUserChanged}
          onBlurCallback={null}
        />
        <label className="pr-2 font-roboto text-sm text-gray-700">Email:</label>
        <TextBox
          value={data.user.email}
          title="Email"
          disabled={!isEditMode || (data.user.email === 'admin@domain.com') }
          className="text-gray-800 text-sm col-span-2"
          textAlign="left"
          onChangeCallback={onUserChanged}
          onBlurCallback={null}
        />
        <label className="pr-2 font-roboto text-sm text-gray-700">Telephone No:</label>
        <TextBox
          value={data.tel_no}
          title="Telephone No"
          disabled={!isEditMode}
          className="text-gray-800 text-sm col-span-2"
          textAlign="left"
          onChangeCallback={onUserChanged}
          onBlurCallback={null}
        />
        <label className="pr-2 font-roboto text-sm text-gray-700">Address:</label>
        <TextBox
          value={data.address}
          title="Address"
          disabled={!isEditMode}
          className="text-gray-800 text-sm col-span-2"
          textAlign="left"
          onChangeCallback={onUserChanged}
          onBlurCallback={null}
        />
        <section className="col-span-3 flex justify-end">
          <Button
            type="button"
            text="Save"
            disabled={false}
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