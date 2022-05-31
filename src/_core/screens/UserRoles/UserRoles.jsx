import React, { useState, useEffect } from "react"
import { Helmet } from "react-helmet-async";
import role_api from "../../api/role_api";
import user_profile_api from "../../api/user_profile_api";
import user_role_api from "../../api/user_role_api";
import { IconTickInCircle } from "../../utilities/svg-icons";

const UserRoles = () => {
  const [roles, setRoles] = useState();
  const [userProfiles, setUserProfiles] = useState();
  const [userRoles, setUserRoles] = useState();
  const [hoverPos, setHoverPos] = useState();

  useEffect(() => {
    (async () => {
      try {
        let role_res = await role_api.index();
        let user_prof_res = await user_profile_api.withUser();
        let user_role_res = await user_role_api.index();
        setRoles(role_res.data.data);
        setUserProfiles(user_prof_res.data.data);
        setUserRoles(user_role_res.data.data);
      } catch (e) {

      }
    })();
  }, [])

  const setCell = (r, c) => {
    setHoverPos({ row: r, col: c });
  }

  const handleCellClick = async (user_id, role_id) => {
    try {
      let res = await user_role_api.toggle(user_id, role_id);
      let user_role_res = await user_role_api.index();
      setUserRoles(user_role_res.data.data);
    } catch (e) {

    }
  }

  return (
    <>
      <Helmet>
        <title>Roles per User</title>
      </Helmet>
      <div className="w-full p-2 rounded overflow-hidden">
        <table>
          <thead>
            <tr className="font-roboto text-sm">
              <td className="h-60 flex items-end px-1">
              </td>
              {
                roles && roles.map((role, i) => {
                  return (
                    <td key={i} className={"w-12 align-bottom pb-1 border " + (hoverPos && hoverPos.col === i ? "bg-gray-200":"")}>
                      <div className="flex justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="100%">
                          <text id="thetext" transform="rotate(270, 12, 0) translate(-138,-2)" fill={(hoverPos && hoverPos.col === i ? "black" : "rgb(90,90,90)")}>{role.code}</text>
                          <text color="red">ddd</text>
                        </svg>
                      </div>
                    </td>
                  )
                })
              }
            </tr>
          </thead>
          <tbody>
            {
              userProfiles && userProfiles.map((userProfile, r) => {
                return (
                  <tr key={r} className="font-roboto text-sm h-8">
                    <td className={"border px-1 " + (hoverPos && hoverPos.row === r ? "bg-gray-200 text-black" : "text-gray-700")}>{userProfile.user.name}</td>
                    {
                      roles.map((role, c) => {
                        return (
                          <td
                            key={c}
                            className="border hover:bg-gray-200"
                            onMouseEnter={() => setCell(r, c)}
                            onMouseLeave={() => setHoverPos()}
                            onClick={() => handleCellClick(userProfile.user_id, role.id)}
                          >
                            {
                              userRoles && (userRoles.length > 0) && userRoles.map((userRole, ur) => <Cell key={ur} role={role} userProfile={userProfile} userRole={userRole} />)
                            }
                          </td>
                        )
                      })
                    }
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </>
  );
}

const Cell = ({role, userProfile, userRole}) => {
  if ((userRole.user_id === userProfile.user_id) && (userRole.role_id === role.id)) {
    return (
      <IconTickInCircle width="15" color="rgb(7, 89, 133)" className="mx-auto" />
    )
  } else {
    return null;
  }
}

export default UserRoles;