import React, { Children, useState, useContext, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { IconChevronRight } from "../../utilities/svg-icons";
// import backdropimg from "../../../assets/raindrops.png"
import AuthContext from "../../providers/AuthContext";

const Sidebar = () => {
  let banner_height = 70;
  let alert_count = 5;
  let auth = useContext(AuthContext);
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    if (auth.isAuthed) {
      if (Array.isArray(auth.permissions)) {
        setPermissions(
          auth.permissions.map(item => item.code)
        )
      }
    }
  }, [auth.isAuthed, auth.permissions])

  return (
    <div className="relative" style={{ minWidth: "15rem" }}>
      {/* <section className="absolute h-screen  bg-sky-900 flex items-end">
        <img src={backdropimg} alt="raindrops" />
      </section> */}
      <nav className='absolute border-r bg-sky-900 text-gray-800 font-publicSans text-xs h-screen' style={{ minWidth: "15rem" }}>
        <Banner height={banner_height} />
        <div style={{ height: `calc(100vh - ${banner_height}px)` }}>
          <Section className="h-full overflow-y-scroll overflow-x-hidden sidebarscroller w-full" collapsed={false} label="Navigator">
            {
              auth.isAuthed &&
              <Folder path="settings" label="Settings">
                {permissions.includes("settings.modifyUsers") && <Node path="userProfiles" label="User Profiles" />}
                <Folder path="security" label="Security">
                  {permissions.includes("settings.modifyRoles") && <Node path="roles" label="Roles" />}
                  {permissions.includes("settings.modifyUserRoles") && <Node path="userRoles" label="Roles per User" />}
                  {permissions.includes("settings.modifyRolePermissions") && <Node path="rolePermissions" label="Permissions per Role" />}
                </Folder>
                {permissions.includes("settings.modifySystemParameters") && <Node path="systemParameters" label="System Parameters" />}
              </Folder>
            }
            <Folder path="purchase" label="Purchase">
              <Folder path="purchaseOrder" label="Purchase Order">
                <Folder path="charges" label="Charges">
                  <Node path="purchaseOrderCharges" label="Purchase Order Charges" />
                  <Node path="inventoryParts" label="Inventory Parts" />
                </Folder>
                <Node path="purchaseOrders" label="Purchase Orders" />
              </Folder>
              <Folder path="part" label="Part">
                <Node path="purchaseParts" label="Purchase Parts" />
              </Folder>
            </Folder>
            <Folder path="inventory" label="Inventory">
              <Node path="inventoryParts" label="Inventory Parts" />
              <Node path="warehouses" label="Warehouses" />
            </Folder>
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
    <section className={`text-center w-full text-lg text-sky-500 h-[${height}px] shadow font-roboto flex items-center justify-center`}><span>Eco Power<br />WOMS</span></section>
  )
}

const Folder = (props) => {
  let location = useLocation();
  const [folderCollapsed, setFolderCollapsed] = useState(true);

  useEffect(() => {
    if (location.pathname.split("/").includes(props.path)) {
      setFolderCollapsed(false);
    };
  }, [location.pathname, props.path])

  const collapseFolder = (e, val) => {
    e.stopPropagation();
    setFolderCollapsed(val);
  }

  return (
    <div className=" w-full rounded pt-1">
      <div className={"py-1 px-1 flex justify-between items-center text-white cursor-default " + (folderCollapsed ? "" : "bg-sky-800a")} onClick={(e) => collapseFolder(e, !folderCollapsed)}>
        <span className="">{props.label}</span>
        <span className={"transition-all duration-300 " + (folderCollapsed ? "" : "rotate-90")}><IconChevronRight width="12" color="white" /></span>
      </div>
      <div className={(folderCollapsed ? "hidden" : "ml-2 w-full")}>
        {
          Children.map(props.children, (child, index) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child, {
                parentPath: props.parentPath ? (props.parentPath + "/" + props.path) : ("/" + props.path)
              });
            }
            return child;
          })
        }
      </div>
    </div>
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
      <div className="flex items-center justify-between w-full bg-sky-700">
        <div className="p-1 text-white w-full">{`${props.label} ${props.count ? " ( " + props.count + " )" : ""}`}</div>
        <span className={"transition-all duration-300 " + (sectionCollapsed ? "" : "rotate-90")}><IconChevronRight width="12" color="white" /></span>
      </div>
      <div className={(sectionCollapsed ? "hidden" : "")}>
        {props.children}
      </div>
    </div>
  )
}

const Node = (props) => {
  return (
    <div className=" text-white w-full">
      <NavLink
        onClick={
          e => {
            e.stopPropagation();
            return true;
          }
        }
        to={props.parentPath + "/" + props.path}
        className={({ isActive }) =>
          " w-full block py-2 px-1 " + (isActive ? "bg-sky-800" : undefined)
        }
      >
        {props.label}
      </NavLink>
    </div>
  )
}

export default Sidebar;