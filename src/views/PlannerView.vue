<script setup lang="ts">
import DefaultLayout from '../layout/DefaultLayout.vue'
import {ref} from 'vue'
import {usePlanStore} from '../stores/plan'
import Card from '../components/default/Card.vue'
import {ToastType, useToastStore} from "@/stores/toast";

const schedule = ref('')
const name = ref('')

const store = usePlanStore()

const toast = useToastStore();

const reset = () => {
  schedule.value = ''
  name.value = ''
}

const submit = async () => {
  await store.submitPlan(name.value, schedule.value).then(() => {
    reset()
  }, err => {
    toast.addToast(err.message, ToastType.error)
  });
}

</script>

<template>
  <default-layout title="Planner">
    <Card :has-padding="true">
      <fieldset class="fieldset">
        <label class="fieldset-label">Name</label>
        <input class="input" type="text" v-model="name" placeholder="Enter name...">

        <label class="fieldset-label">Schedule</label>
        <textarea class="textarea" v-model="schedule" placeholder="Enter schedule..." />

        <div class="mt-3">
          <button class="btn" @click="submit" :disabled="schedule === '' || name === ''">Send</button>
        </div>
      </fieldset>

    </Card>
  </default-layout>
</template>

<style>

</style>
