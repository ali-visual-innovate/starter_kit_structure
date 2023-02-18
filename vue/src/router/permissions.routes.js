// permissions

const Permissions = () => import("../views/permissions/Permissions.vue");
const ShowPermission = () => import("../views/permissions/ShowPermission.vue");
const EditPermission = () => import("../views/permissions/EditPermission.vue");
const CreatePermission = () => import("../views/permissions/CreatePermission.vue");

const permissionsRoutes = [
  {
    path: "permissions",
    name: "Permissions",
    component: Permissions,
  },
  // create
  {
    path: "permissions/create",
    name: "CreatePermission",
    component: CreatePermission,
  },
  // show
  {
    path: "permissions/:id",
    name: "ShowPermission",
    component: ShowPermission,
  },
  // edit
  {
    path: "permissions/:id/edit",
    name: "EditPermission",
    component: EditPermission,
  },
];

export default {
  ...permissionsRoutes,
};
