import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IconChevronRight } from "../../utilities/svg-icons";
import backdropimg from "../../../assets/raindrops.png"

const Sidebar = () => {
  return (
    <div className="relative" style={{ scrollbarWidth: "thin", minWidth: "15rem" }}>
      <section className="absolute h-screen  bg-sky-900 flex items-end" style={{ scrollbarWidth: "thin", minWidth: "15rem" }}>
        <img src={backdropimg} alt="raindrops" />
      </section>
      <nav className='absolute bg-transparent border-r px-1 text-gray-800 font-publicSans text-xs h-screen overflow-y-auto' style={{ scrollbarWidth: "thin", minWidth: "15rem" }}>
        <Banner />
        <RootFolder label="Sales" first>
          <Node to="/customerOrders" label="Customer Orders" />
        </RootFolder>
        <RootFolder label="Purchasing">
          <Folder label="Purchase Order">
            <Folder label="Charges">
              <Node to="/purchaseOrderCharges" label="Purchase Order Charges" />
            </Folder>
            <Node to="/purchaseOrders" label="Purchase Orders" />
          </Folder>
          <Folder label="Part">
            <Node to="/purchaseParts" label="Purchase Parts" />
          </Folder>
        </RootFolder>
        <RootFolder label="Inventory">
          <Node to="/inventoryParts" label="Inventory Parts" />
          <Node to="/warehouses" label="Warehouses" />
        </RootFolder>
      </nav>
    </div>
  )
}

const Banner = () => {
  return (
    <section className="text-center w-full text-lg text-yellow-400 py-2 shadow font-roboto"><span>Eco Power<br />WOMS</span></section>
  )
}

const RootFolder = (props) => {
  const [collapsed, setCollapsed] = useState(true);
  return (
    <ul className={`w-full px-1 pt-3 rounded ` + (props.first ? "mt-1" : "")}>
      <div className={"py-1 px-1 w-full flex justify-between rounded items-center font-semibolda text-white cursor-default " + (collapsed ? "" : "bg-sky-800")} onClick={() => setCollapsed(!collapsed)}>        
        <span className={(collapsed ? "" : "bg-sky-800")}>{props.label}</span>
        <span className={"transition-all duration-300 " + (collapsed ? "" : "rotate-90")}><IconChevronRight width="12" color="white" /></span>
      </div>
      <div className={"transition-all " + (collapsed ? "hidden" : "ml-3")}>
        {props.children}
      </div>
    </ul>
  )
}

const Folder = (props) => {
  const [collapsed, setCollapsed] = useState(true);
  return (
    <ul className="pt-3">
      <div className={"py-1 px-1 flex justify-between w-full rounded items-center  text-white cursor-default " + (collapsed ? "" : "bg-sky-800")} onClick={() => setCollapsed(!collapsed)}>        
        <span className="">{props.label}</span>
        <span className={"transition-all duration-300 " + (collapsed ? "" : "rotate-90")}><IconChevronRight width="12" color="white" /></span>
      </div>
      <div className={(collapsed ? "hidden" : "ml-4")}>
        {props.children}
      </div>
    </ul>
  )
}

const Node = (props) => {
  return (
    <li className="pt-3 px-1 text-white"><Link to={props.to}>{props.label}</Link></li>
  )
}

export default Sidebar;