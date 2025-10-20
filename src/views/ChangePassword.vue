<script setup>
import { ref } from 'vue';
import api from '@/utils/api';
import { useRouter } from 'vue-router';

const oldPassword = ref('');
const newPassword = ref('');
const confirmPassword = ref('');
const success = ref('');
const error = ref('');
const router = useRouter();

const handleChange = async () => {
  error.value = '';
  success.value = '';

  // Vérification côté client
  if (!oldPassword.value || !newPassword.value || !confirmPassword.value) {
    error.value = "Tous les champs sont obligatoires";
    return;
  }

  if (newPassword.value !== confirmPassword.value) {
    error.value = "Les mots de passe ne correspondent pas";
    return;
  }

  try {
    const token = localStorage.getItem('token');
    if (!token) {
      error.value = "Utilisateur non authentifié";
      return;
    }

    await api.post(
      '/change-password',
      {
        oldPassword: oldPassword.value,
        newPassword: newPassword.value,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    // Mise à jour des données locales
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    user.mustChangePassword = false;
    localStorage.setItem('user', JSON.stringify(user));

    success.value = 'Mot de passe changé avec succès. Redirection...';
    setTimeout(() => router.push('/dashboard'), 1000);
  } catch (err) {
    error.value =
      err.response?.data?.message || 'Erreur lors du changement de mot de passe';
  }
};
</script>


<template>
  <div class="change-pw">
    <h2>Changer le mot de passe</h2>
    <form @submit.prevent="handleChange">
      <input v-model="oldPassword" type="password" placeholder="Ancien mot de passe" required />
      <input v-model="newPassword" type="password" placeholder="Nouveau mot de passe (≥8)" required />
      <input v-model="confirmPassword" type="password" placeholder="Confirmer le nouveau mot de passe" required />
     <div class="flex justify-between ">
       <button type="submit" class=" h-[2rem] w-[5rem] bg-blue-400 text-white rounded-lg hover:bg-red-600">Valider</button>
    
     <router-link to="../dashboard"
    class="px-4 h-[2rem] w-[5rem] bg-blue-400 text-white rounded-lg hover:bg-red-600">
      Retour
    </router-link>
     </div>
    </form>

    <p v-if="success" style="color:green">{{ success }}</p>
    <p v-if="error" style="color:red">{{ error }}</p>
  </div>
</template>



<style scoped>
/* garde ton style, simple exemple : */
.change-pw { max-width:420px; margin:100px auto; padding:1.2rem; border:1px solid #ddd; border-radius:8px; text-align:center;}
.change-pw input, .change-pw  { display:block; width:100%; margin-bottom:1rem; padding:.7rem; }
</style>
