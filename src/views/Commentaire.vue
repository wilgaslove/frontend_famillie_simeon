<template>
    <h1 class="fixed top-0 left-0 w-full bg-white p-4  shadow-2xl lg:w-[70%] lg:mx-[15%]  text-2xl text-center">Commentaires</h1>
   
   
  <div class=" comments-container lg:w-[100%] lg:ml-[50%] mt-[1.5rem] ">

    <!-- Formulaire d'ajout/modification -->
    <div v-if="isLoggedIn" class="comment-form my-[2rem] border-solid border-2 p-1">
      <textarea v-model="message" placeholder="Votre commentaire..." rows="3" ></textarea>
        <div class="flex justify-between ">
        <button @click="saveComment" class="h-[2rem] w-[5rem] bg-blue-400 text-white rounded-lg hover:bg-red-600">
        {{ editId ? "Modifier" : "Publier" }}
      </button>
       <router-link to="../dashboard"
      class="text-center h-[2rem] w-[5rem] bg-blue-400 text-white rounded-lg hover:bg-red-600">
        Retour
      </router-link>
      </div>
    </div>
    <p v-else>Connectez-vous pour laisser un commentaire.</p>

    <!-- Liste des commentaires -->
    <div v-for="c in comments" :key="c._id" class="comment-card">
      <div class="comment-header">
        <strong>{{ c.user.nom }} {{ c.user.prenom }}</strong>
        <small>{{ formatDate(c.createdAt) }}</small>
      </div>
      <p>{{ c.message }}</p>

      <!-- Boutons d'action si propriétaire -->
      <div v-if="isOwner(c)" class="comment-actions">
        <button @click="editComment(c)">✏️ Modifier</button>
        <button @click="deleteComment(c._id)">🗑️ Supprimer</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "@/utils/api";

// Données
// const router = useRouter();
const comments = ref([]);
const message = ref("");
const editId = ref(null);
const currentUser = ref(null);

// Vérifier si l'utilisateur est connecté
const isLoggedIn = localStorage.getItem("token") !== null;

// Charger l'utilisateur connecté
if (isLoggedIn) {
  currentUser.value = JSON.parse(localStorage.getItem("user")); // Stocké après login
}

// Charger les commentaires
const loadComments = async () => {
  const res = await api.get("/commentaires");
  comments.value = res.data;
};

// Ajouter ou modifier un commentaire
const saveComment = async () => {
  if (!message.value.trim()) return;

  if (editId.value) {
    await api.put(`/commentaires/${editId.value}`, { message: message.value });
  } else {
    await api.post("/commentaires", { message: message.value });
  }

  message.value = "";
  editId.value = null;
  loadComments();
};

// Préparer l'édition
const editComment = (c) => {
  message.value = c.message;
  editId.value = c._id;
};

// Supprimer un commentaire
// Supprimer un commentaire avec confirmation
const deleteComment = async (id) => {
  const confirmed = window.confirm("Êtes-vous sûr de vouloir supprimer ce commentaire ?");
  if (!confirmed) return;

  try {
    await api.delete(`/commentaires/${id}`);
    loadComments();
  } catch (err) {
    console.error("Erreur lors de la suppression :", err);
  }
};


// Vérifier si l'utilisateur est propriétaire
const isOwner = (comment) => {
  return currentUser.value && comment.user.userLogin === currentUser.value.userLogin;
};

// Formater la date
const formatDate = (date) => {
  return new Date(date).toLocaleString();
};

// Retour sur la page principage 


onMounted(loadComments);
</script>

<style scoped>
.comments-container {
  max-width: 100%;
  /* margin: auto; */
  padding: 1rem;
}
.comment-form textarea {
  width: 100%;
  margin-bottom: 0.5rem;
  border: 1px solid #ddd;

}
.comment-card {
  border-radius: 6px;
  border: 1px solid #ddd;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
}
.comment-header {
  display: flex;
  justify-content: space-between;
}
.comment-actions button {
  margin-right: 0.5rem;
}
</style>
