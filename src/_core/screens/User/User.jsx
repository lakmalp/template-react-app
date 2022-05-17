import React, { useState } from "react"
import { Helmet } from "react-helmet-async";
import { TextBox } from "../../components";
import { IconChevronRight } from "../../utilities/svg-icons"

const User = () => {
  const [selectedRow, setSelectedRow] = useState(0)
  let users = [
    { id: 1, username: "lakmalp", type: "Admin", name: "Lakmal" },
    { id: 2, username: "suneth", type: "Admin", name: "Suneth" },
    { id: 3, username: "tintin", type: "EndUser", name: "Tintin" },
    { id: 4, username: "kaboom", type: "EndUser", name: "Kaboom" },
    { id: 5, username: "lettuce", type: "EndUser", name: "Lettuce" }
  ];
  const onUserChanged = () => { }

  return (
    <>
      <Helmet>
        <title>User</title>
      </Helmet>
      <section className="p-2">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          <div>
            <UserList data={users} selectedRow={selectedRow} setSelectedRow={setSelectedRow} />
          </div>
          <div className="bg-gray-200">{ users.filter((item,i) => (i === selectedRow))[0].name}</div>
        </div>
        {/* <TextBox
          value="Test"
          title="User"
          disabled={false}
          className="text-gray-700 text-sm"
          textAlign="right"
          onChangeCallback={onUserChanged}
          onBlurCallback={null}
        /> */}
      </section>
    </>
  );
}

const UserList = ({ data, selectedRow, setSelectedRow }) => {
  return (
    data.map((item, rownum) => {
      return (
        <UserListItem data={item} rownum={rownum} currentRow={selectedRow} setSelectedRow={setSelectedRow} />
      )
    })
  )
}

const UserListItem = ({ data, rownum, currentRow, setSelectedRow }) => {
  return (
    <div onClick={() => setSelectedRow(rownum)} className={"grid grid-cols-6 text-sm font-roboto border border-transparent hover:border-gray-200 text-gray-700 hover:text-indigo-500 hover:font-semibold " + ((rownum === currentRow) ? "bg-gray-200" : "")}>
      <div className="p-1">{data.username}</div>
      <div className="col-span-5 p-1 flex justify-between items-center">
        <span>{data.name}</span>
        {
          (rownum === currentRow) &&
          <span><IconChevronRight color="rgb(99, 102, 241)" width="15" /></span>
        }
      </div>
    </div>
  )
}

export default User;