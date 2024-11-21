<template>
  <v-container class="fill-height align-center justify-center d-flex" max-width="1200">
  <div v-if="!isLoggedIn" class="login-container">
    <h2>Login</h2>
    <!-- Add error message display -->
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="username">Username:</label>
        <input
          type="text"
          v-model="username"
          id="username"
          required
          :disabled="isLoading"
        />
      </div>
      <div>
        <label for="password">Password:</label>
        <input
          type="password"
          v-model="password"
          id="password"
          required
          :disabled="isLoading"
        />
      </div>
      <button type="submit" :disabled="isLoading">
        {{ isLoading ? "Logging in..." : "Login" }}
      </button>
    </form>
    <div align="center">
      Not yet registered?
      <router-link to="/register">Register NOW</router-link>!
    </div>
  </div>
  <div v-else>
    <div class="login-info">
      <h2>You are already logged in as {{ storedUsername }}</h2>
    </div>
    <div class="logged-out-container"></div>
    <div class="button-group">
      <button @click="handleLogout" class="logout-button">Logout</button>
    </div>
  </div>
</v-container>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { is } from "@babel/types";

export default {
  setup() {
    const username = ref("");
    const password = ref("");
    const isLoggedIn = ref(false);
    const errorMessage = ref("");
    const router = useRouter();
    const isLoading = ref(false);
    const storedUsername = ref("");
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    const checkLoginStatus = () => {
      const loginStatus = localStorage.getItem("isLoggedIn") === "true";
      const token = localStorage.getItem("jwt");
      const savedUsername = localStorage.getItem("username");

      if (!loginStatus || !token || !savedUsername) {
        isLoggedIn.value = false;
        storedUsername.value = "";
      } else {
        isLoggedIn.value = true;
        storedUsername.value = savedUsername;
      }
    };

    const handleLogout = () => {
      localStorage.removeItem("jwt");
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("username");
      localStorage.removeItem("RedirectPath");

      isLoggedIn.value = false;
      storedUsername.value = "";

      // Refresh the page to clear any cached state
      window.location.reload();
    };

    const handleLogin = async () => {
      try {
        isLoading.value = true;
        errorMessage.value = "";

        const formData = new FormData();
        formData.append("username", username.value);
        formData.append("password", password.value);

        console.log("Attempting login..."); // Debug log

        const response = await axios.post(`${baseUrl}/login`, formData);

        console.log("Login response:", response.data); // Debug log

        if (response.data.access_token) {
          localStorage.setItem("jwt", response.data.access_token);
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("username", username.value);

          console.log("Token stored:", localStorage.getItem("jwt")); // Debug log
          console.log("IsLoggedIn:", localStorage.getItem("isLoggedIn")); // Debug log

          router.push("/");
        }
      } catch (error) {
        console.error("Login error:", error);
        errorMessage.value = "Login failed. Please try again.";
        showError.value = true;
      } finally {
        isLoading.value = false;
      }
    };

    onMounted(() => {
      checkLoginStatus();
    });

    return {
      username,
      password,
      handleLogin,
      handleLogout,
      isLoggedIn,
      isLoading,
      errorMessage,
      storedUsername,
    };
  },
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.login-container h2 {
  text-align: center;
}

.login-container div {
  margin-bottom: 15px;
}

.login-container label {
  display: block;
  margin-bottom: 5px;
}

.login-container input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

.login-container button {
  width: 100%;
  padding: 10px;
  background-color: #ff002b;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.login-container button:hover {
  background-color: #ff002b;
}

.button-group {
  display: flex;
  justify-content: center;
}

.logout-button {
  background-color: #ff002b;
  color: white;
}

.logout-button:hover {
  background-color: #ff002b;
}

.login-info {
  text-align: center;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
</style>
