<script setup>
import { ref, onMounted } from "vue";

const items = ref([]);
onMounted(async () => {
  const response = axios.get("/api/permissions");
  items.value = response.data.permissions;
});
</script>

<template>
  <div>
    <v-table fixed-header height="300px">
      <thead>
        <tr>
          <th class="text-left">Id</th>
          <th class="text-left">Name</th>
          <th class="text-left">Module</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.name">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.module }}</td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>
