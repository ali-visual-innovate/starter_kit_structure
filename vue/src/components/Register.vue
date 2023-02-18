<script setup>

// imports
import { ref } from "vue";
import sawaLogo from "../assets/img/sawa_logo.svg";
import { useAuthStore } from "../stores/Auth";

// variables
const form = ref({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
})
const platformName = ref("Sawa Academy");
const authStore = useAuthStore();

// validation
const valid = ref(false);
const rules = ref({
  name : [
    v => !!v || 'Name is required',
  ],
  email : [
    v => !!v || 'E-mail is required',
    v => /.+@.+/.test(v) || 'E-mail must be valid',
  ],
  password: [
    v => !!v || 'Password is required',
  ],
  password_confirmation: [
    v => !!v || 'Password Confirmation is required',
  ],
})

// methods

</script>

<template>
  <v-container>
    <v-row>
      <v-col class="v-col-sm-12 v-col-md-6 offset-md-3 mx-auto">
        <v-card elevation="4" light tag="section">
          <v-card-title>
            <v-layout align-center justify-space-between>
              <h3 class="headline my-auto">
                {{ platformName }}
              </h3>
              <v-col>
                <v-img
                  :alt="platformName"
                  class="ml-3"
                  contain
                  height="48px"
                  position="center right"
                  :src="sawaLogo"
                ></v-img>
              </v-col>
            </v-layout>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-alert
            type="error"
            variant="tonal"
            border="start"
            elevation="2"
            closable
            :close-label="$t('close')"
            v-if="authStore.errors.length !== 0"
              >
              <template v-for="(item, index) in authStore.errors" :value="index" :key="index" >
                <div>
                  {{ item[0] }}
                </div>
              </template>
            </v-alert>
          </v-card-text>
          <v-form @submit.prevent="authStore.handleRegister(form)" v-model="valid">
            <v-card-text>
              <h2 class="text-center">Sign up</h2>
            </v-card-text>
            <v-card-text>
              <v-text-field
                outline
                label="Name"
                type="text"
                v-model="form.name"
                :rules="rules.name"
              ></v-text-field>
              <v-text-field
                outline
                label="Email"
                type="email"
                v-model="form.email"
                :rules="rules.email"
              ></v-text-field>
              <v-text-field
                outline
                label="Password"
                type="password"
                v-model="form.password"
                :rules="rules.password"
              ></v-text-field>
              <v-text-field
                outline
                label="Password Confirmation"
                type="password"
                v-model="form.password_confirmation"
                :rules="rules.password_confirmation"
              ></v-text-field>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn color="info" :to="{ name: 'Login' }"> Login </v-btn>
              <v-spacer></v-spacer>
              <v-btn color="info" type="submit">
                <v-icon left>lock</v-icon>
                Register
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
