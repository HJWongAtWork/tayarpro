<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="elevation-12" v-if="!isLoggedIn">
          <v-card-title class="text-center font-weight-black text-h4 py-4">
            Login
          </v-card-title>

          <v-card-text>
            <v-alert v-if="errorMessage" type="error" variant="tonal" closable>
              {{ errorMessage }}
            </v-alert>

            <v-form @submit.prevent="handleLogin">
              <v-text-field v-model="username" label="Username" prepend-inner-icon="mdi-account" variant="outlined"
                required :disabled="isLoading" class="mb-2"></v-text-field>

              <v-text-field v-model="password" label="Password" prepend-inner-icon="mdi-lock"
                :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" variant="outlined" required
                :disabled="isLoading" :type="showPassword ? 'text' : 'password'"
                @click:append-inner="showPassword = !showPassword"></v-text-field>

              <v-btn type="submit" color="#FF3131" size="large" block :loading="isLoading" class="mt-4">
                {{ isLoading ? "Logging in..." : "Login" }}
              </v-btn>
            </v-form>
          </v-card-text>

          <v-card-text class="text-center">
            Not yet registered?
            <v-btn variant="text" color="#FF3131" to="/register" class="px-1">
              Register NOW
            </v-btn>!
          </v-card-text>
        </v-card>

        <v-card v-else class="elevation-12">
          <v-card-text class="text-center pa-6">
            <v-icon icon="mdi-account-check" color="success" size="x-large" class="mb-4"></v-icon>
            <h2 class="text-h5 mb-4">
              You are logged in as {{ storedUsername }}
            </h2>
            <v-btn color="#FF3131" @click="handleLogout" prepend-icon="mdi-logout">
              Logout
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const isLoggedIn = ref(false)
const errorMessage = ref('')
const router = useRouter()
const isLoading = ref(false)
const storedUsername = ref('')
const showPassword = ref(false)
const baseUrl = import.meta.env.VITE_API_BASE_URL

const checkLoginStatus = () => {
  const loginStatus = localStorage.getItem('isLoggedIn')
  const token = localStorage.getItem('jwt')
  const savedUsername = localStorage.getItem('username')

  if (!loginStatus || !token || !savedUsername) {
    isLoggedIn.value = false;
    storedUsername.value = '';
  }
  else {
    isLoggedIn.value = true;
    storedUsername.value = savedUsername;
  }
}

const handleLogout = () => {
  localStorage.removeItem('jwt')
  localStorage.removeItem('isLoggedIn')
  localStorage.removeItem('username')
  localStorage.removeItem('RedirectPath')

  isLoggedIn.value = false
  storedUsername.value = ''

  // Refresh the page to clear any cached state
  window.location.reload()
}

const handleLogin = async () => {
  try {
    isLoading.value = true
    errorMessage.value = ''

    const formData = new FormData()
    formData.append('username', username.value)
    formData.append('password', password.value)

    console.log('Attempting login...') // Debug log

    const response = await axios.post(`${baseUrl}/login`, formData)

    console.log('Login response:', response.data) // Debug log

    if (response.data.access_token) {
      localStorage.setItem('jwt', response.data.access_token)
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('username', username.value)

      console.log('Token stored:', localStorage.getItem('jwt')) // Debug log
      console.log('IsLoggedIn:', localStorage.getItem('isLoggedIn')) // Debug log

      router.push('/')
    }
  } catch (error) {
    console.error('Login error:', error)
    errorMessage.value = 'Login failed. Please try again.'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  checkLoginStatus()
})
</script>