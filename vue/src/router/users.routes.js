// users

const Index = () => import("../views/users/Index.vue");
const Show = () => import("../views/users/Show.vue");
const Edit = () => import("../views/users/Edit.vue");
const Create = () => import("../views/users/Create.vue");

const usersRoutes = [
  {
    path: "users",
    name: "Users",
    component: Index,
  },
  // create
  {
    path: "users/create",
    name: "CreateUser",
    component: Create,
  },
  // show
  {
    path: "users/:id",
    name: "ShowUser",
    component: Show,
  },
  // edit
  {
    path: "users/:id/edit",
    name: "EditUser",
    component: Edit,
  },
];

export default {
  ...usersRoutes,
};
