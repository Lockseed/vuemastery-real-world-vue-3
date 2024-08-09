<script setup>
import { ref, onMounted, computed, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import EventService from '@/services/EventService';
import EventCard from '@/components/EventCard.vue';

const props = defineProps(['page'])
const router = useRouter();

const page = computed(() => props.page)
const totalEvents = ref(0)
const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvents.value / 2);
  return page.value < totalPages;
})

const events = ref(null)
onMounted(() => {
  watchEffect(() => {
    events.value = null;
    EventService.getEvents(2, page.value)
      .then((response) => {
        // console.log("events: ", response.data)
        events.value = response.data
        totalEvents.value = response.headers['x-total-count']
      })
      .catch((error) => {
        console.log(error)
        router.push({
          name: 'NetworkError'
        });
      })
  });
})
</script>

<template>
  <h1>Events for Good</h1>
  <div class="events">
    <EventCard v-for="event in events" :key="event.key" :event="event" />

    <div class="pagination">
      <router-link id="page-prev" :to="{ name: 'EventList', query: { page: page - 1 } }" rel="prev"
        v-if="page != 1">&#60; Previous</router-link>
      <router-link id="page-next" :to="{ name: 'EventList', query: { page: page + 1 } }" rel="next"
        v-if="hasNextPage">Next &#62;</router-link>
    </div>
  </div>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pagination {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 290px;
}

.pagination a {
  flex: 1 1 auto;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}
</style>
