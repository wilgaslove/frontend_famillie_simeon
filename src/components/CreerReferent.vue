<script setup>
import { ref } from "vue";
// import axios from "axios";
import api from "@/utils/api";

const form = ref({
  nom: "",
  prenom: "",
  userLogin: "",
  motDePasse: ""
});

const message = ref("");
const error = ref("");
const isFormVisible = ref(false); // Variable pour gérer l'affichage du formulaire



const creerReferent = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await api.post("/referents/creer", form.value);
    message.value = "Référent créé avec succès ✅";
    error.value = "";
    form.value = { nom: "", prenom: "", userLogin: "", motDePasse: "" };
    isFormVisible.value = false; // Cacher le formulaire après la création
  } catch (err) {
    message.value = "";
    error.value = err.response?.data?.message || "Erreur lors de la création.";
  }
};

const toggleForm = () => {
  isFormVisible.value = !isFormVisible.value; // Basculer l'affichage du formulaire
};
</script>

<template>
  <div 
   class="my-4 shadow-2xl border-solid border-2 border-gray-300 rounded-lg px-2 py-1">
    <div class="flex justify-between items-center  ">
      <h2 class="text-xl text-white font-bold  ">Créer un Référent</h2>
      <button @click="toggleForm" class="font-bold bg-white text-black px-4 py-2 rounded">
        {{ isFormVisible ? 'Annuler' : '➕' }}
      </button>
    </div>

    <form v-if="isFormVisible" @submit.prevent="creerReferent" class="mt-4 ">
      <div class="mb-2">
        <label class="block ">Nom :</label>
        <input v-model="form.nom" type="text" class="border p-2 w-full" required />
      </div>

      <div class="mb-2">
        <label class="block ">Prénom :</label>
        <input v-model="form.prenom" type="text" class="border p-2 w-full" required />
      </div>

      <div class="mb-2">
        <label class="block ">Login :</label>
        <input v-model="form.userLogin" type="text" class="border p-2 w-full" required />
      </div>

      <div class="mb-4">
        <label class="block ">Mot de passe :</label>
        <input v-model="form.motDePasse" type="password" class="border p-2 w-full" required />
      </div>

      <button type="submit" class="bg-white text-xl text-black px-4 py-2 rounded">
        Sauvegarder
      </button>
    </form>

    <p v-if="message" class="mt-4 text-white">{{ message }}</p>
    <p v-if="error" class="mt-4 text-red-600">{{ error }}</p>
  </div>
</template>

<style >
label {
  color: white;
}
</style>