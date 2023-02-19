
<script setup>
import LocaleSelect from "./LocaleSelect.vue";
import { useAppLangStore } from "../stores/AppLangStore"
import { ref, watch, computed, onMounted } from "vue";
import { useAuthStore } from "../stores/Auth";
import UserProfileMenu from "./UserProfileMenu.vue";
import { useTheme } from 'vuetify'

const theme = useTheme()
const drawer = ref(true);
const group = ref(null);
const authStore = useAuthStore();
const appLangStore = useAppLangStore();

// methods
// const onClick = () => {
//     theme.value = theme.value === "light" ? "dark" : "light";
// };
const toggleTheme = () => theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
const isRtl = computed({
  get() {
    return appLangStore.isRtl
  },
  set(val) {
    appLangStore.isRtl = val
  }
})
watch(group, (newGroupValue) => {
    drawer.value = false;
});
onMounted(async () => {
    await authStore.getUser();
});
</script>

<template>
    <v-locale-provider :rtl="isRtl">
        <v-app>
            <!-- v-system-bar -->
            <v-system-bar color="grey-darken-3"></v-system-bar>

            <!-- v-app-bar -->
            <v-app-bar prominent>
                <v-app-bar-nav-icon
                    @click.stop="drawer = !drawer"
                ></v-app-bar-nav-icon>

                <v-toolbar-title>My Application</v-toolbar-title>

                <v-spacer></v-spacer>
                <!-- locale switcher -->
                <LocaleSelect />

                <!-- theme switcher -->
                <v-btn
                    :prepend-icon="
                        theme.global.name.value === 'light'
                            ? 'mdi-weather-sunny'
                            : 'mdi-weather-night'
                    "
                    @click="toggleTheme"
                >
                </v-btn>
                <template v-if="authStore.authenticated">
                    <UserProfileMenu />
                </template>
                <template v-else>
                    <v-btn :to="{ name: 'Register' }" >Register</v-btn>
                    <v-btn :to="{ name: 'Login' }" >Login</v-btn>
                </template>
            </v-app-bar>

            <!-- sidebar menu -->
            <v-navigation-drawer v-model="drawer">

                <v-list density="compact" nav>
                    <v-list-item
                        prepend-icon="mdi-account-multiple"
                        :title="$t('users')"
                        value="users"
                        :to="{name: 'Users'}"
                    ></v-list-item>
                    <v-list-item
                        prepend-icon="mdi-security"
                        :title="$t('permissions')"
                        value="permissions"
                        :to="{name: 'Permissions'}"
                    ></v-list-item>
                    <v-list-item
                        prepend-icon="mdi-shield-account"
                        :title="$t('roles')"
                        value="roles"
                        :to="{name: 'Roles'}"
                    ></v-list-item>
                </v-list>
            </v-navigation-drawer>

            <!-- this is main content for the application -->
            <v-main>
                <v-container>
                    <RouterView />
                 </v-container>
            </v-main>
                <!-- footer -->
            <v-footer app class="justify-center" border>
                this is footer
            </v-footer>
        </v-app>
    </v-locale-provider>
</template>

