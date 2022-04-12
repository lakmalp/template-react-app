const routes = [
  {
    path: 'purchaseOrders/:id',
    page: 'PurchaseOrder/PurchaseOrderScreen',
    folder: 'app/screens',
    isPrivate: true,
    exact: true,
    grant: 'purchaseOrder.index'
  },
  {
    path: 'purchaseOrders',
    page: 'PurchaseOrder/PurchaseOrderOverviewScreen',
    folder: 'app/screens',
    isPrivate: true,
    exact: true,
    grant: 'purchaseOrder.index'
  },
  {
    path: 'temp',
    page: 'Temp',
    folder: 'app/screens',
    isPrivate: true,
    exact: true,
    grant: 'purchaseOrder.index'
  },
];


export default routes;