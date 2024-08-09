<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import EventService from '@/services/EventService';

// const route = useRoute();
const event = ref(null)
const props = defineProps({
  id: {
    required: true
  }
});
const router = useRouter();

onMounted(() => {
  EventService.getEvent(props.id)
    .then((response) => {
      // console.log("events: ", response.data)
      event.value = response.data
    })
    .catch((error) => {
      console.log(error)
      if (error.response && error.response.status === 404) {
        router.push({
          name: '404Resource',
          params: {
            resource: 'event'
          }
        });
      } else {
        router.push({
          name: 'NetworkError'
        });
      }
    })
});
</script>

<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <!-- we can remove this `params: { id }`, and the links still work perfectly.
    since these links all require `:id` , when the router-link is rendered in the template (if it’s not sent in) it will look at the URL parameters, 
    and if `:id` exists in the current route, it will use the `:id` in all of the link URLs. -->
    <router-link :to="{ name: 'EventDetails' }">Details</router-link> |
    <router-link :to="{ name: 'EventRegister' }">Register</router-link> |
    <router-link :to="{ name: 'EventEdit' }">Edit</router-link>
    <!-- <router-link :to="{ name: 'EventDetails', params: { id } }">Details</router-link> |
    <router-link :to="{ name: 'EventRegister', params: { id } }">Register</router-link> |
    <router-link :to="{ name: 'EventEdit', params: { id } }">Edit</router-link> -->
    <router-view :event="event" />
  </div>
</template>