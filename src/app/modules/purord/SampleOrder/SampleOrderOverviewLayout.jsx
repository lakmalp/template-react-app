import { useEffect, useState, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { StandardTable } from "../../../../_core/components/PremiaTables";
import { DialogBoxContext } from "../../../../_core/providers/DialogBoxContext";
import GlobalStateContext from "../../../../_core/providers/GlobalStateContext";
import { IconPlus, IconDuplicate, IconEdit, IconTrash } from "../../../../_core/utilities/svg-icons";

const SampleOrderOverviewLayout = (props) => {
  let globalState = useContext(GlobalStateContext)
  let {
    parentId: props_parentId,
    refreshData: props_refreshData
  } = props;

  useEffect(() => {
    props_refreshData(props_parentId);
  }, [props_parentId])

  const columnFormatter = (column_name, value) => {
    let ret = value;
    switch (column_name) {
      case "po_no":
        ret = <Link to={`${value}`}>{value}</Link>
        break;
    
      default:
        break;
    }
    return ret;
  }

  const commandBarButtons = [
    {
      label: "Release",
      action: "cmdRelease"
    },
    {
      label: "Create Invoice",
      action: "cmdCreateInvoice"
    },
    {
      label: "View Purchasing History",
      action: "cmdSendToIfs"
    }
  ];

  const tableConfig = {
    general: {
      showGrandSum: false,
      showFilterSum: true,
      addSystemButtonsToSideBar: false
    },
    columns: [
      {
        name: 'id',
        label: 'ID',
        type: 'number',
        align: 'center',
        length: 30,
        decimals: 0,
        visible: { 'xs': false, 'sm': false, 'md': false, 'lg': false, 'xl': false, '2xl': false, '3xl': false },
        autosum: false
      },
      {
        name: '_seq_',
        label: '_seq_',
        type: 'number',
        align: 'left',
        length: 70,
        decimals: 0,
        visible: { 'xs': false, 'sm': false, 'md': false, 'lg': false, 'xl': false, '2xl': false, '3xl': false },
        autosum: false
      },
      {
        name: '_line_no_',
        label: 'Line No',
        type: 'number',
        align: 'left',
        length: 70,
        decimals: 0,
        visible: { 'xs': true, 'sm': true, 'md': true, 'lg': true, 'xl': true, '2xl': true, '3xl': true },
        autosum: false
      },
      {
        name: 'po_no',
        label: 'PO Number',
        type: 'string',
        align: 'left',
        length: 90,
        decimals: 0,
        visible: { 'xs': true, 'sm': true, 'md': true, 'lg': true, 'xl': true, '2xl': true, '3xl': true },
        autosum: false
      },
      {
        name: 'created_date',
        label: 'Created Date',
        type: 'date',
        align: 'left',
        length: 270,
        decimals: 0,
        visible: { 'xs': true, 'sm': true, 'md': true, 'lg': true, 'xl': true, '2xl': true, '3xl': true },
        autosum: false
      },
      // {
      //   name: 'supplier',
      //   label: 'Supplier',
      //   type: 'object',
      //   align: 'left',
      //   length: 320,
      //   decimals: 0,
      //   visible: { 'xs': false, 'sm': false, 'md': false, 'lg': true, 'xl': true, '2xl': true, '3xl': true },
      //   select: ['code', 'description'],
      //   concatChar: " - ",
      //   autosum: false
      // },
      {
        name: 'delivery_date',
        label: 'Delivery Date',
        type: 'date',
        align: 'left',
        length: 270,
        decimals: 0,
        visible: { 'xs': true, 'sm': true, 'md': true, 'lg': true, 'xl': true, '2xl': true, '3xl': true },
        autosum: false
      },
      {
        name: 'status',
        label: 'Status',
        type: 'string',
        align: 'left',
        length: 80,
        decimals: 0,
        visible: { 'xs': true, 'sm': true, 'md': true, 'lg': true, 'xl': true, '2xl': true, '3xl': true },
        autosum: false
      },
      // {
      //   name: 'tax',
      //   label: 'Tax',
      //   type: 'currency',
      //   align: 'right',
      //   length: 70,
      //   decimals: 0,
      //   visible: { 'xs': false, 'sm': false, 'md': false, 'lg': true, 'xl': true, '2xl': true, '3xl': true },
      //   autosum: true
      // },
      // {
      //   name: 'amount',
      //   label: 'Amount',
      //   type: 'currency',
      //   align: 'right',
      //   length: 70,
      //   decimals: 0,
      //   visible: { 'xs': false, 'sm': false, 'md': false, 'lg': true, 'xl': true, '2xl': true, '3xl': true },
      //   autosum: true
      // },
    ]
  };

  const tableStyle = {
    baseStyle: {
      commandBarButton: {
        enabled: "text-xs px-2 rounded py-1 font-roboto hover:shadow cursor-pointer",
        disabled: "text-xs px-2 rounded py-1 font-roboto cursor-default"
      },
      sideBarButton: {
        enabled: "  rounded-full hover:bg-gray-200 cursor-pointer",
        disabled: " opacity-50 cursor-default"
      }
    },
    yellow: {
      commandBarButton: {
        enabled: "golden-yellow text-black",
        disabled: "bg-ss-100 text-gray-400"
      },
      sideBarButton: {
        enabled: "",
        disabled: ""
      }
    },
    blue: {
      commandBarButton: {
        enabled: "border border-blue-300 bg-gradient-to-b from-blue-200 to-blue-300 hover:from-blue-300",
        disabled: "border border-gray-200 bg-gradient-to-b from-gray-50 to-gray-100 text-gray-400"
      },
      sideBarButton: {
        enabled: "",
        disabled: ""
      }
    },
    dark: {
      commandBarButton: {
        enabled: "bg-gray-800 text-gray-100",
        disabled: "bg-ss-100 text-gray-400"
      },
      sideBarButton: {
        enabled: "",
        disabled: ""
      }
    }
  };

  const commandBarInquireHandler = (data, setData, selectedLines, action) => {
    if (props.disabled) {
      return false;
    } else {
      if (selectedLines.length > 0) {
        switch (action) {
          case "cmdRelease":
            return data.filter(line => selectedLines.includes(line.id)).reduce((acc, curr) => {
              return acc && (curr.status === "Planned")
            }, true);

          case "cmdCreateInvoice":
            return data.filter(line => selectedLines.includes(line.id)).reduce((acc, curr) => {
              return acc && (curr.status === "Released")
            }, true);

          case "cmdSendToIfs":
            return data.filter(line => selectedLines.includes(line.id)).reduce((acc, curr) => {
              return acc && (curr.status === "Closed")
            }, true);

          case "cmdSendToProm":
            return data.filter(line => selectedLines.includes(line.id)).reduce((acc, curr) => {
              return acc && (["Released", "Closed"].includes(curr.status))
            }, true);

          default:
            return false;
        }
      } else {
        return false;
      }
    }
  }

  const commandBarActionHandler = (data, setData, selectedLines, action) => {
    alert(selectedLines, action)
  }

  const doSearch = (token) => {
    alert("please write search logic");
  }

  const doDetailSearch = (tokens) => {
    alert("please write detail search logic");
  }

  return (
    <StandardTable
      configuration={tableConfig}                         // configuration: table and column configuration details      
      style={tableStyle}                                  // style: table styling details      
      theme={props.theme}                                 // theme: specifies which theme to be applied
      data={props.data}                                   // data: data      
      dataSource={props.name}                             // dataSource: data source in which the table has been attached to
      loadingSource={globalState.loadingSource}           // loadingDataSource: current loading data source
      refreshData={props.refreshData}                     // refreshData: callback to refresh data
      columnFormatter={columnFormatter}

      lineMenu={false}                                    // lineMenu: line menu configurations      
      lineMenuInquireHandler={null}                       // lineMenuInquireHandler: line menu inquire handler callback      
      lineMenuActionHandler={null}                        // lineMenuActionHandler: line menu action handler callback      

      commandBarButtons={commandBarButtons}               // commandBarButtons: command bar configuration      
      commandBarInquireHandler={commandBarInquireHandler} // commandBarInquireHandler: command bar inquire callback      
      commandBarActionHandler={commandBarActionHandler}   // commandBarActionHandler: command bar action handler callback      

      sideBarButtons={false}                              // sideBarButtons: side bar configuration      
      sideBarInquireHandler={null}                        // sideBarInquireHandler: side bar inquire callback      
      sideBarActionHandler={null}                         // sideBarActionHandler: side bar action handler callback      

      containerRef={props.containerRef}                   // containerRef: used in column resizing when table is resized
      doSearch={doSearch}                                 // doSearch:			            search callback      
      doDetailSearch={doDetailSearch}                     // doDetailSearch:			      detail search callback
      disabled={props.disabled}                           // disabled: disables all button actions
    />
  )

  // return (
  //   <div className="mx-2 rounded border p-1">
  //     <table className="">
  //       <thead>
  //         <tr><th className="font-nunito text-xs border-b">PO Number</th></tr>
  //       </thead>
  //       <tbody>
  //         {
  //           data?.map((row, i) => <tr className="font-nunito text-sm border-b hover:bg-yellow-100"><td key={i}><Link to={`/sampleOrders/${row.po_no}`}>{row.po_no}</Link></td></tr>)
  //         }
  //       </tbody>
  //     </table>
  //   </div>
  // )
}

export default SampleOrderOverviewLayout;