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
    path: '/users',
    page: 'User',
    folder: '_core/screens',
    isPrivate: true,
    exact: true,
    grant: 'settings.modifyUsers'
  },
  {
    path: '/roles',
    page: 'Role',
    folder: '_core/screens',
    isPrivate: true,
    exact: true,
    grant: 'settings.modifyRoles'
  },
  {
    path: '/userRoles',
    page: 'UserRole',
    folder: '_core/screens',
    isPrivate: true,
    exact: true,
    grant: 'settings.modifyUserRoles'
  },
  {
    path: '/rolePermissions',
    page: 'RolePermission',
    folder: '_core/screens',
    isPrivate: true,
    exact: true,
    grant: 'settings.modifyUserRoles'
  },
  {
    path: '/systemParameters',
    page: 'SystemParamater',
    folder: '_core/screens',
    isPrivate: true,
    exact: true,
    grant: 'settings.modifySystemParameters'
  },
];

export default routes