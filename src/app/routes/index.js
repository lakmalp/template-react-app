const routes = [
  {
    path: 'sampleOrders/:id',
    page: 'SampleOrder/SampleOrderScreen',
    folder: 'app/screens',
    isPrivate: true,
    exact: true,
    grant: 'sampleOrder.index'
  },
  {
    path: 'sampleOrders',
    page: 'SampleOrder/SampleOrderOverviewScreen',
    folder: 'app/screens',
    isPrivate: true,
    exact: true,
    grant: 'sampleOrder.index'
  },
  {
    path: 'temp',
    page: 'Temp',
    folder: 'app/screens',
    isPrivate: true,
    exact: true,
    grant: 'sampleOrder.index'
  },
];


export default routes;