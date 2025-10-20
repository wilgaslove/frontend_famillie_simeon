<template>
  <header class="navbar">
    <div class="nav-container">
      <!-- Logo -->
      <!-- <router-link to="/" class="logo">MonApp</router-link> -->

      <!-- Bouton burger pour mobile -->
      <button class="burger bg-black" @click="toggleMenu">☰</button>

      <!-- Menu Desktop -->
      <nav class="nav-links desktop bg-gray-400 py-2 px-1">
        <router-link
          to="../Guide/"
          class="bg-blue-500 text-white rounded-lg hover:bg-red-600 w-full px-1 mr-2"
          >Guide d'utilisateur</router-link
        >
        <router-link
          to="../Change-Password/"
          class="bg-blue-500 text-white rounded-lg hover:bg-red-600 w-full px-1 mr-2"
          >Edit PassWord</router-link
        >
        <router-link
          to="../Commentaire/"
          class="bg-blue-500 text-white rounded-lg hover:bg-red-600 w-full px-1 mr-2"
          >Commentaire</router-link
        >
        <a
          href="#"
          @click.prevent="logout"
          class="bg-blue-500 text-white rounded-lg hover:bg-red-600 w-full px-1 mr-2"
          >Déconnexion</a
        >
      </nav>
    </div>

    <!-- Menu Mobile -->
    <nav class="nav-links mobile" v-show="menuOpen">
      <router-link
        to="../Guide/"
        class="bg-blue-400 text-white rounded-lg hover:bg-red-600 w-full px-1"
        >Guide d'utilisateur</router-link
      >
      <router-link
        to="../Change-Password/"
        class="bg-blue-400 text-white rounded-lg hover:bg-red-600 w-full px-1"
        >Edit PassWord</router-link
      >
      <router-link
        to="../Commentaire/"
        class="bg-blue-400 text-white rounded-lg hover:bg-red-600 w-full px-1"
        >Commentaire</router-link
      >
      <a
        href="#"
        @click.prevent="logout"
        class="bg-blue-400 text-white rounded-lg hover:bg-red-600 w-full px-1"
        >Déconnexion</a
      >
    </nav>
  </header>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const menuOpen = ref(false);
const router = useRouter();

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

const closeMenu = () => {
  menuOpen.value = false;
};

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  router.push("/login");
};
</script>

<style scoped>
/* .navbar {
  background-color: gray;
  color: white;
  padding: 0.5rem 1rem;
} */

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-weight: bold;
  color: white;
  text-decoration: none;
}

.burger {
  background: none;
  border: none;
  color: black;
  font-size: 1.5rem;
  cursor: pointer;
  display: none; /* caché par défaut (desktop) */
}

/* .nav-links {
  display: flex;
  flex-direction: row;
  gap: 1rem;
} */

.nav-links a,
.nav-links router-link {
  color: white;
  text-decoration: none;
}

/* Cacher menu mobile par défaut */
.mobile {
  display: none;
  flex-direction: column;
  gap: 0.5rem;
  /* background-color: #333; */
  padding: 1rem;
}

/* Responsive */
@media (max-width: 900px) {
  .desktop {
    display: none;
  }
  .burger {
    display: block;
  }
  .mobile {
    display: flex;
  }
}
</style>
