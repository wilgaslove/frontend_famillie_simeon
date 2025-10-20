<script setup>
import { ref } from "vue";
import api from "@/utils/api";
import { useRouter } from "vue-router";

const userLogin = ref("");
const motDePasse = ref("");
const error = ref("");
const loading = ref(false);
const router = useRouter();

const handleLogin = async () => {
  error.value = "";
  loading.value = true;

  try {
    const { data } = await api.post("/login", {
      userLogin: userLogin.value.trim(),
      motDePasse: motDePasse.value,
    });

    const { token, user } = data;

    if (!token || !user) {
      throw new Error("Données de connexion invalides");
    }

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    // Nettoyage des champs
    userLogin.value = "";
    motDePasse.value = "";

    // Redirection en fonction de la situation
    if (user.mustChangePassword) {
      router.push("/change-password");
    } else {
      router.push("/dashboard");
    }
  } catch (err) {
    if (err.response) {
      // Erreur venant du serveur
      error.value = err.response.data?.message || "Erreur de connexion";
    } else if (err.request) {
      // Erreur réseau
      error.value = "Impossible de contacter le serveur";
    } else {
      // Erreur interne
      error.value = err.message || "Une erreur est survenue";
    }
  } finally {
    loading.value = false;
  }
};
</script>



<template>
  <div class="login-container">
    <h2>Connexion</h2>
    <form @submit.prevent="handleLogin" class="login-form">
      <input
        v-model="userLogin"
        type="text"
        placeholder="Nom.prenom"
        required
      />
      <input class=" text-xl text-black"
        v-model="motDePasse"
        type="password"
        placeholder="Mot de passe"
        required
      />
      <button type="submit">Se connecter</button>
    </form>

    <p v-if="error" class="error">{{ error }}</p>
  </div>
  <div></div>
</template>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 100px auto;
  padding: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  text-align: center;
}
.login-form input,
.login-form button {
  display: block;
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.8rem;
}
.error {
  color: red;
  font-weight: bold;
}
</style>
