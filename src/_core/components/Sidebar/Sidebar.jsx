import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <nav className='w-60 bg-white border-r h-full pt-10 pl-2 text-gray-800 font-semibold font-inter text-sm'>
        <ul>
          <li>
            <Link to="/purchaseOrders">Purchase Orders</Link>
          </li>
        </ul>
      </nav>
  )
}

export default Sidebar;