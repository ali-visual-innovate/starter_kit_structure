// permissions

const Index = () => import("../views/permissions/Index.vue");
const Show = () => import("../views/permissions/Show.vue");
const Edit = () => import("../views/permissions/Edit.vue");
const Create = () => import("../views/permissions/Create.vue");

const permissionsRoutes = [
  {
    path: "permissions",
    name: "Permissions",
    component: Index,
  },
  // create
  {
    path: "permissions/create",
    name: "CreatePermission",
    component: Create,
  },
  // show
  {
    path: "permissions/:id",
    name: "ShowPermission",
    component: Show,
  },
  // edit
  {
    path: "permissions/:id/edit",
    name: "EditPermission",
    component: Edit,
  },
];

export default {
  ...permissionsRoutes,
};
