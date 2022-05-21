let routes = [
  {
    path: '/login',
    page: 'Login',
    folder: '_core/screens',
    isPrivate: false,
    exact: true,
    grant: 'auth.login'
  },
  {
    path: '/404',
    page: 'NotFound',
    folder: '_core/screens',
    isPrivate: true,
    exact: true,
    grant: 'auth.notfound'
  },
  {
    path: '/',
    page: 'Home',
    folder: '_core/screens',
    isPrivate: true,
    exact: true,
    grant: 'auth.home'
  },
  {
    path: '/userProfiles',
    page: 'UserProfiles',
    folder: '_core/screens',
    isPrivate: true,
    exact: true,
    grant: 'settings.modifyUsers'
  },
  {
    path: '/roles',
    page: 'Roles',
    folder: '_core/screens',
    isPrivate: true,
    exact: true,
    grant: 'settings.modifyRoles'
  },
  {
    path: '/userRoles',
    page: 'UserRoles',
    folder: '_core/screens',
    isPrivate: true,
    exact: true,
    grant: 'settings.modifyUserRoles'
  },
  {
    path: '/rolePermissions',
    page: 'RolePermissions',
    folder: '_core/screens',
    isPrivate: true,
    exact: true,
    grant: 'settings.modifyUserRoles'
  },
  {
    path: '/systemParameters',
    page: 'SystemParamaters',
    folder: '_core/screens',
    isPrivate: true,
    exact: true,
    grant: 'settings.modifySystemParameters'
  },
];

export default routes