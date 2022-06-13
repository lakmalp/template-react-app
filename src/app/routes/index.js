const routes = [
  {
    path: 'enterp/sites/:id',
    page: 'Site/SiteScreen',
    folder: 'app/screens',
    isPrivate: true,
    exact: true,
    grant: 'site.index'
  },
  {
    path: 'enterp/sites',
    page: 'Site/SiteOverviewScreen',
    folder: 'app/screens',
    isPrivate: true,
    exact: true,
    grant: 'site.index'
  },
];


export default routes;