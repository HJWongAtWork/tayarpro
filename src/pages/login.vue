<template>
  <v-container class="border-lg justify-center align-center" width="500" height="auto" style="
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
  ">
    <!-- Logged Out State -->
    <v-card class="elevation-12" v-if="!isLoggedIn">
      <div class="text-h5 my-3 text-center" width="auto">
        <strong>Log In</strong>
      </div>

      <v-form class="ma-auto" ref="form" v-model="valid" :class="{ headShake: shakeForm }"
        @submit.prevent="handleLogin">
        <v-card-title class="mt-5" align="center">
          <v-text-field width="400" label="Username" prepend-inner-icon="mdi-account" type="text"
            :rules="[rules.required]" required v-model="username" :disabled="isLoading"></v-text-field>

          <v-text-field autocomplete width="400" v-model="password" label="Password" prepend-inner-icon="mdi-lock"
            :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" :type="showPassword ? 'text' : 'password'"
            :rules="[rules.required]" required @click:append-inner="showPassword = !showPassword"
            :disabled="isLoading"></v-text-field>
            <div class="text-right"><a @click="showPassword = !showPassword">
          <span style="font-size: 10px;" v-if="!showPassword">Show Password</span>
          <span style="font-size: 10px;" v-else>Hide Password</span>
        </a></div>
        </v-card-title>

        <v-card-text v-if="errorMessage">
          <v-alert type="error" variant="tonal" closable>{{ errorMessage }}</v-alert>
        </v-card-text>

        <v-card-actions class="justify-center">
          <v-btn width="400" color="white" style="background-color: #FF3131" type="submit"
            :disabled="!isValidLogin || isLoading">
            {{ isLoading ? "Logging in..." : "Log In" }}
          </v-btn>
        </v-card-actions>

        <v-card-text class="text-right mr-3">
          <v-dialog width="500">
            <template v-slot:activator="{ props: activatorProps }">
              <v-btn color="primary" v-bind="activatorProps" style="text-transform: none">
                Forgot Password
              </v-btn>
            </template>

            <template v-slot="{ isActive }">
              <v-card>
                <v-card-title class="text-h5 grey lighten-2">
                  Forgot Password
                </v-card-title>

                <v-card-text class="pb-0">
                  <v-text-field label="Email" prepend-inner-icon="mdi-email" type="email"
                    :rules="[rules.required, rules.email]" required v-model="forgotEmail"></v-text-field>
                </v-card-text>

                <v-card-text>
                  <v-alert v-if="passwordMessage" dense>
                    {{ passwordMessage }}
                  </v-alert>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" :disabled="!isValidForgotEmail" @click="fetchPassword">
                    Send
                  </v-btn>
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>
        </v-card-text>

        <v-card-text class="text-center">
          Don't have an account?
          <router-link to="/register" style="color: #FF3131" class="ml-2">Sign Up</router-link>
        </v-card-text>
      </v-form>
    </v-card>

    <!-- Logged In State -->
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
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useUserStore } from '@/stores/userStore'

// Refs
const form = ref(null)
const valid = ref(true)
const username = ref('')
const password = ref('')
const showPassword = ref(false)
const forgotEmail = ref('')
const errorMessage = ref('')
const shakeForm = ref(false)
const passwordMessage = ref('')
const isLoading = ref(false)
const isLoggedIn = ref(false)
const storedUsername = ref('')

// Router and Store
const router = useRouter()
const userStore = useUserStore()
const baseUrl = import.meta.env.VITE_API_BASE_URL

// Computed Properties
const isValidForgotEmail = computed(() => {
  return !!forgotEmail.value && rules.email(forgotEmail.value) === true
})

const isValidLogin = computed(() => {
  return !!username.value && !!password.value
})

// Validation Rules
const rules = {
  required: (value) => !!value || 'Required.',
  email: (value) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return pattern.test(value) || 'Invalid email.'
  }
}

// Methods
const checkLoginStatus = () => {
  const loginStatus = localStorage.getItem('isLoggedIn')
  const token = localStorage.getItem('jwt')
  const savedUsername = localStorage.getItem('username')

  if (!loginStatus || !token || !savedUsername) {
    isLoggedIn.value = false
    storedUsername.value = ''
  } else {
    isLoggedIn.value = true
    storedUsername.value = savedUsername
  }
}

const handleLogout = () => {
  localStorage.removeItem('jwt')
  localStorage.removeItem('isLoggedIn')
  localStorage.removeItem('username')
  localStorage.removeItem('RedirectPath')
  userStore.clearUser() // Reset Pinia store

  isLoggedIn.value = false
  storedUsername.value = ''

  window.location.reload()
}

const handleLogin = async () => {
  if (form.value && form.value.validate()) {
    try {
      isLoading.value = true
      errorMessage.value = ''

      const formData = new FormData()
      formData.append('username', username.value)
      formData.append('password', password.value)

      const response = await axios.post(`${baseUrl}/login`, formData)

      if (response.data.access_token) {
        localStorage.setItem('jwt', response.data.access_token)
        localStorage.setItem('isLoggedIn', 'true')
        localStorage.setItem('username', username.value)

        userStore.setUser(response.data.user_info)
        router.push('/')
      }
    } catch (error) {
      console.error('Login error:', error)
      errorMessage.value = 'Login failed. Please try again.'
      shakeForm.value = true
      setTimeout(() => {
        shakeForm.value = false
      }, 1000)
    } finally {
      isLoading.value = false
    }
  }
}

const fetchPassword = async () => {
  try {
    passwordMessage.value = 'Password reset instructions sent to your email.'
    // Implement password recovery logic here
  } catch (error) {
    passwordMessage.value = 'Failed to send reset instructions. Please try again.'
  }
}

// Lifecycle Hooks
onMounted(() => {
  document.title = 'Login'
  checkLoginStatus()
})
</script>

<style scoped>
@keyframes headShake {
  0% {
    transform: translateX(0);
  }

  6.5% {
    transform: translateX(-6px) rotateY(-9deg);
  }

  18.5% {
    transform: translateX(5px) rotateY(7deg);
  }

  31.5% {
    transform: translateX(-3px) rotateY(-5deg);
  }

  43.5% {
    transform: translateX(2px) rotateY(3deg);
  }

  50% {
    transform: translateX(0);
  }
}

.headShake {
  animation-name: headShake;
  animation-duration: 1s;
  animation-timing-function: ease-in-out;
}

</style>