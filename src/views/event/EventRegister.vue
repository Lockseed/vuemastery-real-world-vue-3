<script setup>
import { useRouter } from 'vue-router';

const props = defineProps(['event'])
const router = useRouter();

const register = () => {
  console.log('Register me!');
  // If registration is successful, route to the event details page
  router.push({
    name: 'EventDetails',
    params: { id: props.event.id } // 可以不写
  });
}
</script>

<template>
  <p>Register for the Event</p>
  <button @click="register">Register me!</button>
</template>