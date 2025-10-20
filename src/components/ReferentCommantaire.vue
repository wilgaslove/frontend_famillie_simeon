<script setup>
import { ref, onMounted } from 'vue'
import api from '@/utils/api' 

const referents = ref([])
const error = ref('')

onMounted(async () => {
  try {
    const response = await api.get('/referents-membres')  
    referents.value = response.data
  } catch (err) {
    console.error(err)
    error.value = 'Impossible de charger les référents.'
  }
})

const ajouterCommentaire = async (commentaire) => {
  try {
    const response = await api.post('/leaders-commentaires', {
      referentId: referentId, // Assurez-vous d'envoyer l'ID du référent
      commentaire,
    });
    alert(response.data.message); // Afficher un message de confirmation
  } catch (err) {
    console.error(err);
    alert('Erreur lors de l\'ajout du commentaire');
  }
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
    >
      <h3 class="font-semibold text-lg">
        {{ item.referent.prenom }} {{ item.referent.nom }} ({{ item.referent.userLogin }})
      </h3>
      <textarea v-model="item.commentaire" placeholder="Ajouter un commentaire" class="border p-2 w-full mb-2"></textarea>
      <button @click="ajouterCommentaire(item.referent._id, item.commentaire)" class="bg-blue-500 text-white p-2 rounded">
        Ajouter Commentaire
      </button>
    </div>
  </div>
</template>

<style scoped>
/* Ajoutez des styles supplémentaires ici si nécessaire */
</style>