import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useContext, useEffect, useRef } from "react";
import GlobalStateContext from "../../../_core/providers/GlobalStateContext";
import EventBus from "../../../_core/utilities/event-bus";
import SampleOrderOverviewLayout from "../../modules/purord/SampleOrder/SampleOrderOverviewLayout";
import sample_order_api from "../../modules/purord/SampleOrder/sample_order_api";

const SampleOrderOverviewScreen = (props) => {
  const containerRef = useRef();
  const theme = "blue";
  let globalState = useContext(GlobalStateContext)

  useEffect(() => {
    console.log("------loading SampleOrderOverviewScreen----------");
    globalState.write("SampleOrders", []);

    EventBus.on("loadHeader", (refresh_id) => {
      globalState.write("SampleOrders", []);
      refreshData("SampleOrders", refresh_id);
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
      let _res = await sample_order_api.query(1, 10, {});
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
        <title>Overview - Sample Orders</title>
      </Helmet>
      <div className="font-montserrat text-md font-semibold text-ss-900 px-2 my-2 ">
        {`Sample Orders`}
      </div>
      <div ref={containerRef}>
        <SampleOrderOverviewLayout
          parent=""
          parentId=""
          name="SampleOrders"
          containerRef={containerRef}
          data={globalState.read("SampleOrders")}
          refreshData={async (id) => refreshData("SampleOrders", id)}
          className="mt-4 mb-8 px-2"
          theme={theme}
          disabled={globalState.headerIsLoading}
        />
      </div>
    </>
  )
}

export default SampleOrderOverviewScreen;