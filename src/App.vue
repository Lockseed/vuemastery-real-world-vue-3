<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { inject } from 'vue';

const GStore = inject('GStore');
</script>

<template>
  <div id="layout">
    <div id="flash-message" v-if="GStore.flashMessage">
      {{ GStore.flashMessage }}
    </div>
    <header>
      <div class="wrapper">
        <nav>
          <RouterLink :to="{ name: 'EventList' }">Events</RouterLink> |
          <RouterLink :to="{ name: 'About' }">About</RouterLink>
        </nav>
      </div>
    </header>
    <RouterView />
  </div>
</template>

<style>
#layout {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

@keyframes yellowfade {
  from {
    background: yellow;
  }

  to {
    background: transparent;
  }
}

#flash-message {
  animation-name: yellowfade;
  animation-duration: 3s;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

h2 {
  font-size: 20px;
}
</style>