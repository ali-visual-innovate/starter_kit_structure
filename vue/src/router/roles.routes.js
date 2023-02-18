// roles

const Index = () => import("../views/roles/Index.vue");
const Show = () => import("../views/roles/Show.vue");
const Edit = () => import("../views/roles/Edit.vue");
const Create = () => import("../views/roles/Create.vue");

const rolesRoutes = [
  {
    path: "roles",
    name: "Roles",
    component: Index,
  },
  // create
  {
    path: "roles/create",
    name: "CreateRole",
    component: Create,
  },
  // show
  {
    path: "roles/:id",
    name: "ShowRole",
    component: Show,
  },
  // edit
  {
    path: "roles/:id/edit",
    name: "EditRole",
    component: Edit,
  },
];

export default {
  ...rolesRoutes,
};
