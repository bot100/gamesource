<template>
  <div class="container-fluid">
    <div class="row">
      <aside id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
        <div class="position-sticky pt-3">
          <ul class="nav flex-column">
            <li class="nav-item">
              <RouterLink class="nav-link" :to="{ name: 'dashboard' }">
                <VIcon icon="mdi-view-dashboard"></VIcon>
                Dashboard</RouterLink
              >
            </li>

            <li class="nav-item">
              <RouterLink class="nav-link" :to="{ name: 'user-profile' }">
                <VIcon icon="mdi-account"></VIcon>
                Profile</RouterLink
              >
            </li>

            <li v-if="userStore.user.isAdmin" class="nav-item">
              <RouterLink class="nav-link" :to="{ name: 'articles' }">
                <VIcon icon="mdi-note"></VIcon>
                Articles</RouterLink
              >
            </li>

            <li v-if="userStore.user.isAdmin" class="nav-item">
              <RouterLink class="nav-link" :to="{ name: 'articles-add' }">
                <VIcon icon="mdi-note-edit"></VIcon>
                Add Articles</RouterLink
              >
            </li>
          </ul>
        </div>
      </aside>

      <section id="admin_body" class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <RouterView v-slot="{ Component }">
          <KeepAlive :include="['ArticlesAdd']">
            <Component :is="Component" />
          </KeepAlive>
        </RouterView>
        <!-- <RouterView /> -->
      </section>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user';
const userStore = useUserStore();
</script>
