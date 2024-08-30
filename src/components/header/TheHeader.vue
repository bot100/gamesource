<template>
  <header>
    <div class="container header_container">
      <div class="logo">
        <RouterLink :to="{ name: 'home' }">GameSource</RouterLink>
      </div>

      <nav>
        <ul>
          <li v-if="!userStore.auth">
            <RouterLink :to="{ name: 'auth' }">Sign in</RouterLink>
          </li>

          <span v-else>
            <li>
              <span @click="userStore.logout">Logout</span>
            </li>
            <li>
              <RouterLink :to="{ name: 'dashboard' }">Dashboard</RouterLink>
            </li>
          </span>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { useUserStore } from '@/stores/user';
const userStore = useUserStore();
</script>
