import React, { Children, useState, useContext, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { IconChevronRight } from "../../utilities/svg-icons";
// import backdropimg from "../../../assets/raindrops.png"
import AuthContext from "../../providers/AuthContext";

const Sidebar = () => {
  let banner_height = 70;
  let alert_count = 5;
  let auth = useContext(AuthContext);

  return (
    <div className="relative " style={{ minWidth: "15rem" }}>
      {/* <section className="absolute h-screen  bg-sky-900 flex items-end">
        <img src={backdropimg} alt="raindrops" />
      </section> */}
      <nav className='absolute border-ra bg-zinc-100 text-gray-800 font-publicSans text-xs h-screen' style={{ minWidth: "15rem" }}>
        <Banner height={banner_height} />
        <div style={{ height: `calc(100vh - ${banner_height}px)` }}>
          <Section className="h-full overflow-y-auto overflow-x-hidden sidebarscroller w-full" collapsed={false} label="Navigator">
            {
              auth.isAuthed &&
              <>
                <Folder path="settings" label="Settings">
                  {auth.grants.includes("POST:api/userProfiles") && <Node path="userProfiles" label="User Profiles" />}
                  <Folder path="security" label="Security">
                    {auth.grants.includes("POST:api/fnd/roles") && <Node path="roles" label="Roles" />}
                    {auth.grants.includes("POST:api/fnd/userRoles") && <Node path="userRoles" label="Roles per User" />}
                    {auth.grants.includes("POST:api/fnd/rolePermissions") && <Node path="rolePermissions" label="Permissions per Role" />}
                  </Folder>
                  {auth.grants.includes("PATCH:api/fnd/systemParameters") && <Node path="systemParameters" label="System Parameters" />}
                </Folder>
                <Folder path="enterp" label="Enterprise">
                  {auth.grants.includes("POST:api/sites") && <Node path="sites" label="Site" />}
                  {auth.grants.includes("POST:api/sites") && <Node path="companies" label="Company" />}
                </Folder>
              </>
            }
          </Section>
          <Footer>
            <Section collapsed={true} label="Alerts" count={alert_count} >
              <p className="px-1 py-2 text-red-300">No alerts!</p>
            </Section>
          </Footer>
        </div>
      </nav>
    </div>
  )
}

const Banner = ({ height }) => {
  return (
    <section className={`text-center w-full text-lg h-[${height}px] shadowa font-roboto flex items-center justify-center h-10`}><span>Eco Power</span></section>
  )
}

const Folder = (props) => {
  let location = useLocation();
  const [folderCollapsed, setFolderCollapsed] = useState(true);
  const [content, setContent] = useState();

  useEffect(() => {
    if (location.pathname.split("/").includes(props.path)) {
      setFolderCollapsed(false);
    };
  }, [location.pathname, props.path])

  const collapseFolder = (e, val) => {
    e.stopPropagation();
    setFolderCollapsed(val);
  }

  useEffect(() => {
    let _content = Children.map(props.children, (child, index) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          parentPath: props.parentPath ? (props.parentPath + "/" + props.path) : ("/" + props.path)
        });
      }
      return child;
    });

    setContent(_content);
  }, [props.children, props.parentPath, props.path])

  return (
    (Children.count(content) > 0) &&
    <div className=" w-full rounded mt-1 pt-1 pr-1">
      <div className={"py-1 px-1 flex justify-betweenx items-center text-black cursor-default " + (folderCollapsed ? "" : "")} onClick={(e) => collapseFolder(e, !folderCollapsed)}>
        <span className={"transition-all duration-300 " + (folderCollapsed ? "" : "rotate-90")}><IconChevronRight width="12" color="black" /></span>
        <span className=" ml-1">{props.label}</span>
      </div>
      <div className={(folderCollapsed ? "hidden" : "ml-3 w-full")}>
        {
          content
        }
      </div>
    </div >
  )
}

const Footer = (props) => {
  return (
    <div className="absolute bottom-0 w-full">
      {props.children}
    </div>
  )
}

const Section = (props) => {
  const [sectionCollapsed, setSectionCollapsed] = useState(props.collapsed);

  const collapseSection = (e, val) => {
    e.stopPropagation();
    setSectionCollapsed(val);
  }

  return (
    <div className={props.className} onClick={(e) => collapseSection(e, !sectionCollapsed)}>
      <div className="flex items-center justify-between w-full bg-zinc-200">
        <div className="p-1 text-zinc-500 w-full font-semibold uppercase text-xs ">{`${props.label} ${props.count ? " ( " + props.count + " )" : ""}`}</div>
      </div>
      <div className={(sectionCollapsed ? "hidden" : "")}>
        {props.children}
      </div>
    </div>
  )
}

const Node = (props) => {
  return (
    <div className=" text-gray-900 w-full">
      <NavLink
        onClick={
          e => {
            e.stopPropagation();
            return true;
          }
        }
        to={props.parentPath + "/" + props.path}
        className={({ isActive }) =>
          " w-full block py-2 px-1 " + (isActive ? " font-semibold" : "")
        }
      >
        <div className="flex items-center">
          <span className={"transition-all duration-300 ml-3"}></span>
          <span className="ml-1">{props.label}</span>
        </div>
      </NavLink>
    </div>
  )
}

export default Sidebar;