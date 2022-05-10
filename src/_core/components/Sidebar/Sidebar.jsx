import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IconChevronRight } from "../../utilities/svg-icons";
import backdropimg from "../../../assets/raindrops.png"

const Sidebar = () => {
  let banner_height = 70;
  let alert_count = 5;
  return (
    <div className="relative" style={{ minWidth: "15rem" }}>
      {/* <section className="absolute h-screen  bg-sky-900 flex items-end">
        <img src={backdropimg} alt="raindrops" />
      </section> */}
      <nav className='absolute border-r bg-sky-900 text-gray-800 font-publicSans text-xs h-screen' style={{ minWidth: "15rem" }}>
        <Banner height={banner_height} />
        <div style={{ height: `calc(100vh - ${banner_height}px)` }}>
          <Section className="h-full overflow-y-scroll overflow-x-hidden sidebarscroller" collapsed={false} label="Navigator">
            <Folder label="Purchasing">
              <Folder label="Purchase Order">
                <Folder label="Charges">
                  <Node to="/purchaseOrderCharges" label="Purchase Order Charges" />
                </Folder>
                <Node to="/purchaseOrders" label="Purchase Orders" />
              </Folder>
              <Folder label="Part">
                <Node to="/purchaseParts" label="Purchase Parts" />
              </Folder>
            </Folder>
            <Folder label="Inventory">
              <Node to="/inventoryParts" label="Inventory Parts" />
              <Node to="/warehouses" label="Warehouses" />
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
  const [folderCollapsed, setFolderCollapsed] = useState(true);

  const collapseFolder = (e, val) => {
    e.stopPropagation();
    setFolderCollapsed(val);
  }

  return (
    <ul className=" w-full rounded pt-1">
      <div className={"py-1 px-1 flex justify-between items-center text-white cursor-default " + (folderCollapsed ? "" : "bg-sky-800a")} onClick={(e) => collapseFolder(e, !folderCollapsed)}>
        <span className="">{props.label}</span>
        <span className={"transition-all duration-300 " + (folderCollapsed ? "" : "rotate-90")}><IconChevronRight width="12" color="white" /></span>
      </div>
      <div className={(folderCollapsed ? "hidden" : "ml-2")}>
        {props.children}
      </div>
    </ul>
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
    <li className="pt-3 px-1 text-white">
      <Link onClick={e => {
        e.stopPropagation();
        return true;
      }} to={props.to}>{props.label}
      </Link>
    </li>
  )
}

export default Sidebar;