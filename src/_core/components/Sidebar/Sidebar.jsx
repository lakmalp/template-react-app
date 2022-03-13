import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IconChevronRight } from "../../utilities/svg-icons";

const Sidebar = () => {
  return (
    <nav className='bg-sky-800 border-r px-1 text-gray-800 font-publicSans text-xs h-screen overflow-y-auto' style={{scrollbarWidth: "thin", minWidth: "15rem"}}>
      <RootFolder label="Sales" first>
        <Node to="/customerOrders" label="Customer Orders" />
      </RootFolder>
      <RootFolder label="Purchasing">
        <Folder label="Purchase Order">
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
      {/* <ul>
        <li>
          Sales
          <ul>
            <li><Link to="/customerOrders">Customer Orders</Link></li>
          </ul>
        </li>
        <li>
          Purchasing
          <ul>
            <li><Link to="/purchaseOrders">Purchase Orders</Link></li>
          </ul>
        </li>
      </ul> */}
    </nav>
  )
}

const RootFolder = (props) => {
  const [collapsed, setCollapsed] = useState(true);
  return (
    <ul className={`w-full px-1 py-2 rounded bg-sky-800 ` + (props.first?"mt-1":"mt-2")}>
      <div className="w-full flex items-center font-semibold text-white" onClick={() => setCollapsed(!collapsed)}><IconChevronRight width="12" color="white" />{props.label}</div>
      <div className={(collapsed ? "hidden" : "mx-3")}>
        {props.children}
      </div>
    </ul>
  )
}

const Folder = (props) => {
  const [collapsed, setCollapsed] = useState(true);
  return (
    <ul className="pt-2">
      <div className="font-semibold flex items-center  text-white" onClick={() => setCollapsed(!collapsed)}><IconChevronRight width="12" color="white" />{props.label}</div>
      <div className={(collapsed ? "hidden" : "ml-3")}>
        {props.children}
      </div>
    </ul>
  )
}

const Node = (props) => {
  return (
    <li className="pt-2  text-white"><Link to={props.to}>{props.label}</Link></li>
  )
}

export default Sidebar;