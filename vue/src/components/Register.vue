<script setup>
// imports
import { ref } from "vue";
import sawaLogo from "../assets/img/sawa_logo.svg";
import { useAuthStore } from "../stores/Auth";

// variables
const form = ref({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
});
const authStore = useAuthStore();

// validation
const valid = ref(false);
const rules = ref({
  name: [(v) => !!v || "Name is required"],
  email: [
    (v) => !!v || "E-mail is required",
    (v) => /.+@.+/.test(v) || "E-mail must be valid",
  ],
  password: [(v) => !!v || "Password is required"],
  password_confirmation: [(v) => !!v || "Password Confirmation is required"],
});
</script>

<template>
  <div class="py-4">
    <v-img class="mx-auto mb-10" max-width="228" :src="sawaLogo"></v-img>

    <v-card
      class="mx-auto pa-12 pb-8"
      elevation="8"
      max-width="448"
      rounded="lg"
    >
    <!-- errors -->
      <v-alert
        type="error"
        variant="tonal"
        border="start"
        elevation="2"
        closable
        :close-label="$t('close')"
        v-if="authStore.errors.length !== 0"
      >
        <template
          #text
          v-for="(item, index) in authStore.errors"
          :value="index"
          :key="index"
        >
          {{ item[0] }}
        </template>
      </v-alert>

      <v-form @submit.prevent="authStore.handleRegister(form)" v-model="valid">
        <!-- name -->
        <div class="text-subtitle-1 text-medium-emphasis">Name</div>
        <v-text-field
          density="compact"
          placeholder="Enter your name"
          prepend-inner-icon="mdi-account"
          variant="outlined"
          v-model="form.name"
          :rules="rules.name"
        ></v-text-field>
        <!-- email -->
        <div class="text-subtitle-1 text-medium-emphasis">Account</div>
        <v-text-field
          density="compact"
          placeholder="Email address"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
          v-model="form.email"
          :rules="rules.email"
        ></v-text-field>

        <!-- password -->
        <div
          class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
        >Password</div>

        <v-text-field
          type="password"
          density="compact"
          placeholder="Enter your password"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="visible = !visible"
          v-model="form.password"
          :rules="rules.password"
        ></v-text-field>

        <!-- password confirmation -->
        <div
          class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
        >Confirm Password</div>
        
        <v-text-field
          type="password"
          density="compact"
          placeholder="Retype your password"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="visible = !visible"
          v-model="form.password_confirmation"
          :rules="rules.password_confirmation"
        ></v-text-field>
        <!-- Sign up btn -->
        <v-btn
          block
          type="submit"
          class="mb-6 mt-2"
          color="blue"
          size="large"
          variant="tonal"
        >
          Sign up
        </v-btn>
      </v-form>
      <!-- Login link -->
      <v-card-text class="text-center">
        <router-link
          class="text-blue text-decoration-none"
          :to="{ name: 'Login' }"
          rel="noopener noreferrer"
        >
          Login<v-icon icon="mdi-chevron-right"></v-icon>
        </router-link>
      </v-card-text>
    </v-card>
  </div>
</template>
