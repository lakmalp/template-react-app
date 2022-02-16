import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const PurchaseOrdersScreen = () => {
  return (
    <>
      <Helmet>
        <title>Overview - Purchase Orders</title>
      </Helmet>
      <div>Purchase Orders <Link to="92">92</Link></div>
    </>
  )
}

export default PurchaseOrdersScreen;