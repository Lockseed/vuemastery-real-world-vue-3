<script setup>
import { inject } from 'vue';
import { useRouter } from 'vue-router';

const { event } = defineProps(['event'])
const router = useRouter();
const GStore = inject('GStore');

const register = () => {
  console.log('Register me!');
  // If registration is successful, route to the event details page
  GStore.flashMessage = 'You are now registered for ' + event.title;
  setTimeout(() => {
    GStore.flashMessage = ''
  }, 3000);
  router.push({
    name: 'EventDetails',
    params: { id: event.id } // 可以不写
  });
}
</script>

<template>
  <p>Register for the Event</p>
  <button @click="register">Register me!</button>
</template>