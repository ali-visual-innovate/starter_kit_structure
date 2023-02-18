import { defineStore } from "pinia";
import axios from "axios";
import { useStorage } from "@vueuse/core";

export const useAuthStore = defineStore("Auth", {
  state: () => ({
    authUser: useStorage("authUser", {}),
    authenticated: useStorage("authenticated", false),
    authErrors: [],
    token: useStorage("token", null),
    msg: "",
  }),
  getters: {
    user: (state) => state.authUser,
    errors: (state) => state.authErrors,
    successMsg: (state) => state.msg,
  },
  actions: {
    async getUser() {
      if (this.authenticated == true && this.authUser) {
        const response = await axios.get('api/get-user');
      }
    },
    async handleLogin(data) {
      try {
        this.resetAuthStore();
        const response = await axios.post("/api/login", {
          email: data.email,
          password: data.password,
        });
        this.authenticated = true;
        this.token = response.data.token;
        this.authUser = response.data.user;
        this.router.push({ name: "Home" });
      } catch (error) {
        if (error.response.status === 422) {
          this.authErrors = error.response.data.errors;
        }
      }
    },
    async handleRegister(data) {
      try {
        this.resetAuthStore();
        const response = await axios.post("/api/register", {
          name: data.name,
          email: data.email,
          password: data.password,
          password_confirmation: data.password_confirmation,
        });
        this.authenticated = true;
        this.token = response.data.token;
        this.authUser = response.data.user;
        this.router.push({ name: "Home" });
      } catch (error) {
        if (error.response.status === 422) {
          this.authErrors = error.response.data.errors;
        }
      }
    },
    async handleLogout() {
      await axios.post("/api/logout");
      this.resetAuthStore();
      this.router.push({ name: "Login" });
    },
    async forgotPassword(data) {
      try {
        this.resetAuthStore();
        const response = await axios.post("/api/forgot-password", {
          email: data.email,
        });
        this.msg = response.data.status;
        this.router.push({ name: "ResetPassword" });
      } catch (error) {
        if (error.response.status === 422) {
          this.authErrors = error.response.data.errors;
        } else {
          // handling exceptions from frontend prespective only
          let errors = [];
          let exceptionArr = [];
          exceptionArr.push(error.response.data.message);
          errors.push(exceptionArr);
          this.authErrors = errors;
        }
      }
    },
    async resetPassword(data) {
      try {
        await axios.post("/api/reset-password", data);
        this.router.push({ name: "Login" });
      } catch (error) {
        if (error.response.status === 422) {
          this.authErrors = error.response.data.errors;
        }
      }
    },
    resetAuthStore() {
      this.authUser = null;
      this.token = null;
      this.authenticated = false;
      this.authErrors = [];
      this.msg = "";
    },
  },
});
