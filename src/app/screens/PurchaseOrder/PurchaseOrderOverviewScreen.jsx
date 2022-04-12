import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useContext, useEffect, useRef } from "react";
import GlobalStateContext from "../../../_core/providers/GlobalStateContext";
import EventBus from "../../../_core/utilities/event-bus";
import PurchaseOrderOverviewLayout from "../../modules/purord/PurchaseOrder/PurchaseOrderOverviewLayout";
import purchase_order_api from "../../modules/purord/PurchaseOrder/purchase_order_api";

const PurchaseOrderOverviewScreen = (props) => {
  const containerRef = useRef();
  const theme = "blue";
  let globalState = useContext(GlobalStateContext)

  useEffect(() => {
    EventBus.on("loadHeader", (refresh_id) => {
      globalState.write("PurchaseOrders", []);
      refreshData("PurchaseOrders", refresh_id);
    }
    );

    return () => {
      EventBus.remove("loadHeader");
    }
  }, [])

  const refreshData = async (dataSource, parent_id) => {
    try {
      globalState.setLoadingSource(dataSource)
      EventBus.dispatch("loadingStarted", dataSource);
      let _res = await purchase_order_api.query(1, 10, {});
      let data = _res.data.data;
      globalState.write(dataSource, data);
      globalState.setLoadingSource();
      EventBus.dispatch("loadingFinished");
    } catch (err) {
      console.error(err.message)
    }
  }

  return (
    <>
      <Helmet>
        <title>Overview - Purchase Orders</title>
      </Helmet>
      <div className="font-montserrat text-md font-semibold text-ss-900 px-2 my-2 ">
        {`Purchase Orders`}
      </div>
      <div ref={containerRef}>
        <PurchaseOrderOverviewLayout
          parent=""
          parentId=""
          name="PurchaseOrders"
          containerRef={containerRef}
          data={globalState.read("PurchaseOrders")}
          refreshData={async (id) => refreshData("PurchaseOrders", id)}
          className="mt-4 mb-8 px-2"
          theme={theme}
          disabled={globalState.headerIsLoading}
        />
      </div>
    </>
  )
}

export default PurchaseOrderOverviewScreen;