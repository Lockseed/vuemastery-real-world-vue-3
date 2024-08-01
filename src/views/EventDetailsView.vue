<script setup>
import { ref, onMounted } from 'vue';
// import { useRoute } from 'vue-router';
import EventService from '@/services/EventService';

// const route = useRoute();
const event = ref(null)
const props = defineProps({
  id: {
    required: true
  }
});

onMounted(() => {
  EventService.getEvent(props.id)
    .then((response) => {
      // console.log("events: ", response.data)
      event.value = response.data
    })
    .catch((error) => {
      console.log(error)
    })
});
</script>

<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>
  </div>
</template>