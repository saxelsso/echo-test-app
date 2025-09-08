<script setup lang="ts">
import { ref } from 'vue'
import Todos from './components/Todos.vue'

// Step 1: Import and generate the Amplify Data client
import { generateClient } from 'aws-amplify/data'
import type { Schema } from '../amplify/data/resource'

const client = generateClient<Schema>()

const echoInput = ref('')
const echoResult = ref<string | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)

// Step 2: Function to invoke echoService
const callEchoService = async () => {
  loading.value = true
  error.value = null
  try {
    const { data } = await client.mutations.echoService({ echoString: echoInput.value })
    echoResult.value = data
  } catch (err: any) {
    error.value = err.message || 'Error calling echoService'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <main>
    <Todos />
    <section style="margin-top:2em;">
      <h2>Echo Service Test</h2>
      <input v-model="echoInput" placeholder="Enter text to echo" />
      <button @click="callEchoService" :disabled="loading">Echo</button>
      <div v-if="loading">Loading...</div>
      <div v-if="echoResult">Echoed: {{ echoResult }}</div>
      <div v-if="error" style="color:red;">Error: {{ error }}</div>
    </section>
  </main>
</template>

