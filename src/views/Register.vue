<script setup>
import { ref } from 'vue'
import axios from 'axios'

const userLogin = ref('')
const nom = ref('')
const prenom = ref('')
const motDePasse = ref('')
const message = ref('')
const isError = ref(false)

const handleRegister = async () => {
  try {
    const response = await axios.post('http://localhost:3000/api/register', {
      userLogin: userLogin.value,
      nom: nom.value,
      prenom: prenom.value,
      motDePasse: motDePasse.value,
      role: 'referent'   // IMPORTANT : forcer le rôle référent ici
    })
    message.value = response.data.message
    isError.value = false
  } catch (err) {
    message.value = err.response?.data?.message || 'Erreur lors de l’inscription'
    isError.value = true
  }
}
</script>


<template>
  <div class="register-container">
    <h2>Inscription Référent</h2>
    <form @submit.prevent="handleRegister">
      <input v-model="userLogin" type="text" placeholder="Login" required />
      <input v-model="nom" type="text" placeholder="Nom" />
      <input v-model="prenom" type="text" placeholder="Prénom" />
      <input v-model="motDePasse" type="password" placeholder="Mot de passe" required />
      <button type="submit">S’inscrire</button>
    </form>
    <p v-if="message" :class="{ error: isError }">{{ message }}</p>
  </div>
</template>


<style scoped>
.register-container {
  max-width: 400px;
  margin: 100px auto;
  padding: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  text-align: center;
}
form input,
form button {
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
