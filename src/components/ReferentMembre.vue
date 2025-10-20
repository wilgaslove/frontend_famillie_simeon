<script setup>
import { ref, onMounted } from "vue";
import api from "@/utils/api"; // ton utilitaire API centralisé

// Liste des référents et état de l'affichage
const referents = ref([]);
const error = ref("");
const selectedReferentId = ref(null);

// Chargement des référents et leurs membres
onMounted(async () => {
  try {
    const response = await api.get("/referents-membres");
    referents.value = response.data;
  } catch (err) {
    console.error(err);
    error.value =
      err.response?.data?.message || "Impossible de charger les référents.";
  }
});

// Fonction pour afficher ou cacher les membres liés à un référent
function toggleMembres(referentId) {
  selectedReferentId.value =
    selectedReferentId.value === referentId ? null : referentId;
}
</script>

<template>
  <div class="p-4">
    <h2 class="text-xl font-bold mb-4">Liste des Référents</h2>

    <div v-if="error" class="text-red-600">{{ error }}</div>

    <div
      v-for="item in referents"
      :key="item.referent._id"
      class="mb-4 border p-4 rounded cursor-pointer hover:bg-gray-100 transition-all"
      @click="toggleMembres(item.referent._id)"
    >
      <h3 class="font-semibold text-lg">
        {{ item.referent.prenom }} {{ item.referent.nom }} ({{
          item.referent.userLogin
        }})
      </h3>

      <ul
        v-if="selectedReferentId === item.referent._id"
        class="ml-4 list-disc mt-2"
      >
        <li v-for="membre in item.membres" :key="membre._id">
          {{ membre.firstName }} {{ membre.lastName }}
        </li>
      </ul>
    </div>
  </div>
</template>
