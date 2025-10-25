<script setup>
import { ref, onMounted, computed } from "vue";
import api from "@/utils/api";
import CreerReferent from "@/components/CreerReferent.vue";
import ReferentMembre from "@/components/ReferentMembre.vue";
import NavBar from "@/components/NavBar.vue";

const membres = ref([]);
const error = ref("");
const recherche = ref("");

const showReferent = ref(false);
const toggleReferent = () => (showReferent.value = !showReferent.value);

const user = ref(
  JSON.parse(localStorage.getItem("user")) || { nom: "", prenom: "", role: "" }
);

const afficherFormulaire = ref(false);
const afficherEdition = ref(false);
const membreSelectionne = ref(null);
const afficherModal = ref(false);

const dateDebut = ref("");
const dateFin = ref("");

// Filtrage des membres (recherche + date)
const membresFiltres = computed(() => {
  return membres.value.filter((m) => {
    const nomComplet = `${m.firstName} ${m.lastName}`.toLowerCase();
    const nomMatch = nomComplet.includes(recherche.value.toLowerCase());

    const dateMembre = m.dateArrivee?.substring(0, 10) || "";
    let dateMatch = true;

    if (dateDebut.value && dateFin.value) {
      dateMatch = dateMembre >= dateDebut.value && dateMembre <= dateFin.value;
    }

    return nomMatch && dateMatch;
  });
});

// Formulaire nouveau membre
const nouveauMembre = ref({
  firstName: "",
  lastName: "",
  profession: "",
  contact: "",
  address: "",
  dateArrivee: "",
  requetePriere: "",
  baptise: false,
  desireRencontrerPasteur: false,
  rdvPasteur: "",
  veuxIntegrer: false,
  visiteMaison: false,
  contactRegulier: false,
  commentAvoirRelationChrist: false,
  renouvelleMonEngagement: false,
  nouvelleNaissance: false,
  note: "",
  veuxFaireBapteme: false,
  dePassage: false,
  suivi: {
    dimanche1: false,
    dimanche2: false,
    dimanche3: false,
    dimanche4: false,
  },
});

// Récupération des membres
const fetchMembres = async () => {
  try {
    let route = "/membres"; // Admin & Leader par défaut
    if (user.value.role === "referent") {
      route = "/mes-membres";
    }
    const res = await api.get(route);
    membres.value = res.data;
  } catch (err) {
    error.value = err.response?.data?.message || "Erreur chargement membres";
  }
};

// Ajouter un membre
const ajouterMembre = async () => {
  try {
    await api.post("/membres", nouveauMembre.value);
    afficherFormulaire.value = false;
    fetchMembres();
    resetForm();
  } catch (err) {
    error.value = err.response?.data?.message || "Erreur ajout membre";
  }
};

// Modifier un membre
const modifierMembre = (membre) => {
  const membreCopie = { ...membre };
  if (membreCopie.dateArrivee)
    membreCopie.dateArrivee = membreCopie.dateArrivee.substring(0, 10);
  if (membreCopie.rdvPasteur)
    membreCopie.rdvPasteur = membreCopie.rdvPasteur.substring(0, 10);
  nouveauMembre.value = membreCopie;
  afficherFormulaire.value = true;
  afficherEdition.value = true;
};

// Mettre à jour un membre
const mettreAJourMembre = async () => {
  try {
    await api.put(`/membres/${nouveauMembre.value._id}`, nouveauMembre.value);
    fetchMembres();
    resetForm();
    afficherFormulaire.value = false;
    afficherEdition.value = false;
  } catch (err) {
    error.value = err.response?.data?.message || "Erreur mise à jour membre";
  }
};

// Supprimer un membre
const supprimerMembre = async (id) => {
  if (confirm("Voulez-vous vraiment supprimer ce membre ?")) {
    try {
      await api.delete(`/membres/${id}`);
      fetchMembres();
    } catch (err) {
      error.value = err.response?.data?.message || "Erreur suppression membre";
    }
  }
};

// Voir les détails d'un membre
const voirMembre = (membre) => {
  membreSelectionne.value = membre;
  afficherModal.value = true;
};

const fermerModal = () => {
  afficherModal.value = false;
  membreSelectionne.value = null;
};

// Réinitialiser le formulaire
const resetForm = () => {
  nouveauMembre.value = {
    firstName: "",
    lastName: "",
    profession: "",
    contact: "",
    address: "",
    dateArrivee: "",
    requetePriere: "",
    baptise: false,
    desireRencontrerPasteur: false,
    rdvPasteur: "",
    veuxIntegrer: false,
    visiteMaison: false,
    contactRegulier: false,
    note: "",
    suivi: {
      dimanche1: false,
      dimanche2: false,
      dimanche3: false,
      dimanche4: false,
    },
  };
};

// Déconnexion
// const logout = () => {
//   localStorage.removeItem("token");
//   localStorage.removeItem("user");
//   window.location.href = "/login";
// };

// Statistiques
// Statistiques basées sur la liste filtrée
const totalMembres = computed(() => membresFiltres.value.length);

const totalBaptises = computed(
  () => membresFiltres.value.filter((m) => m.baptise).length
);

const totalVIE = computed(
  () => membresFiltres.value.filter((m) => m.veuxIntegrer).length
);

const commentAvoirRelationChrist = computed(
  () => membresFiltres.value.filter((m) => m.commentAvoirRelationChrist).length
);

const renouvelleMonEngagement = computed(
  () => membresFiltres.value.filter((m) => m.renouvelleMonEngagement).length
);

const nouvelleNaissance = computed(
  () => membresFiltres.value.filter((m) => m.nouvelleNaissance).length
);
const dePassage = computed(
  () => membresFiltres.value.filter((m) => m.dePassage).length
);
const desireRencontrerPasteur = computed(
  () => membresFiltres.value.filter((m) => m.desireRencontrerPasteur).length
);

// Affichage de l'introduction
const showIntro = ref(true);

const step = ref(0);
const referents = ref([]);
// Chargement initial
onMounted(async () => {
  fetchMembres();
  // Affiche progressivement les paragraphes
  let i = 0;
  const interval = setInterval(() => {
    i++;
    step.value = i;
    if (i === 3) clearInterval(interval);
  }, 2000); // délai de 2s entre chaque paragraphe

  // Cacher l'introduction après 50 secondes
  setTimeout(() => {
    showIntro.value = false; // Cache après 30s
  }, 25000); // 30 000 ms = 30s

  // Récupérer les référents et leurs membres (pour l'affichage dans le modal)
  // try {
  //   const response = await api.get("/referents-membres");
  //   referents.value = response.data;
  // } catch (err) {
  //   console.error(err);
  //   error.value =
  //     err.response?.data?.message || "Impossible de charger les référents.";
  // }
});
</script>

<template>
  <div>
    <div
      v-if="showIntro"
      class="shadow-2xl p-6 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-2xl space-y-6 lg:mx-[15%] lg:w-[70%] lg:mt-4 lg:left-1/2 lg:transform lg:translate-x-1/2"
    >
      <button
        @click="showIntro = false"
        class="absolute top-3 right-3 size-14 text-red-500 hover:text-red-600 transition"
      >
        ✖
      </button>
      <div
        class="text-center text-3xl font-bold tracking-wide text-indigo-600 dark:text-indigo-400 animate-pulse"
      >
        ✨ Bienvenue sur ADN ✨

        <h1 class="text-xl font-bold lg:px-2 lg:bg-gray-200">
          {{ user.nom }} {{ user.prenom }}
        </h1>
      </div>

      <!-- Paragraphes avec animation progressive -->
      <transition-group
        name="fade-up"
        tag="div"
        class="space-y-4 leading-relaxed text-lg"
      >
        <p key="1" v-if="step >= 1">
          <strong>
            Merci de tout cœur pour le temps, l’amour et l’énergie que vous
            consacrez à l’avancement du Royaume de notre Père Céleste. Votre
            engagement est précieux et profondément apprécié. 🌿💖
          </strong>
        </p>

        <p key="2" v-if="step >= 2">
          <strong>
            Cette application est là pour vous soutenir dans le suivi et
            l’intégration des nouveaux, avec simplicité et efficacité.
          </strong>
        </p>

        <p key="3" v-if="step >= 3">
          <strong>
            Si c’est votre première visite, nous vous encourageons à parcourir
            le guide d’utilisation afin de découvrir toutes les fonctionnalités.
            🌟
          </strong>
        </p>
      </transition-group>
    </div>

    <div v-else>
      <div class="dashboard">
        <!-- Users connecté et logout -->
        <div
          class="flex fixed top-0 left-0 w-full bg-white p-4 shadow-2xl xl:mx-[15%] xl:w-[70%]"
        >
          <h1 class="text-xl font-bold lg:px-2 lg:bg-gray-200">
            {{ user.role }}: {{ user.nom }} {{ user.prenom }}
          </h1>
          <div class="ml-auto shadow-2xl">
            <NavBar />
          </div>
        </div>

        <div
          class="mt-16 lg:mt-[5rem] border-solid border-2 border-gray-300 p-1 rounded-lg"
        >
          <div class="text-center my-2">
            <strong class="text-lg mb-2">Liste des membres</strong>
          </div>
          <div
            class="h-[20rem] overflow-y-auto shadow- border-gray-200 border-[1px] rounded-lg bg-gray-200 p-1"
          >
            <ul class="space-y-2 shadow-">
              <li
                v-for="membre in membresFiltres"
                :key="membre._id"
                class="flex justify-between items-center border p-2 rounded bg-white shadow"
              >
                <span>{{ membre.firstName }} {{ membre.lastName }} </span>
                <div class="flex gap-3 text-xl">
                  <button @click="voirMembre(membre)">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      class="w-5 h-5 text-blue-600"
                    >
                      <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                      <path
                        fill-rule="evenodd"
                        d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                  <button
                    v-if="user.role === 'referent'"
                    @click="modifierMembre(membre)"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-5 h-5 text-green-600"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1
                2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897
                1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Z"
                      />
                    </svg>
                  </button>
                  <button @click="supprimerMembre(membre._id)">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      class="w-5 h-5 text-red-600"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.5 4.478v.227a48.816 48.816 0 0 1
                3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005
                13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087
                6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0
                0 1 7.5 4.705v-.227c0-1.564 1.213-2.9
                2.816-2.951a52.662 52.662 0 0 1 3.369
                0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196
                51.196 0 0 1 3.273 0C14.39 3.05 15
                3.684 15 4.478v.113a49.488 49.488 0 0 0-6
                0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355
                5.945a.75.75 0 1 0-1.5.058l.347
                9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75
                0 1 0-1.498-.058l-.347 9a.75.75 0 0 0
                1.5.058l.345-9Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </li>
            </ul>
          </div>
          <div
            class="mt-4 flex flex-col border-solid border-2 border-gray-300 p-2 rounded-lg bg-gray-100"
          >
            <div class="flex gap-2 mx-2 mb-3">
              <label class="text-black">
                Date de début
                <input
                  type="date"
                  v-model="dateDebut"
                  placeholder="Date début"
                />
              </label>
              <label class="text-black">
                Date de fin
                <input type="date" v-model="dateFin" placeholder="Date fin" />
              </label>
            </div>
            <div class="flex">
              <input
                v-model="recherche"
                type="text"
                placeholder="🔍 Rechercher un membre"
                class="mb-4 p-2 border w-4/5 mr-4 rounded"
              />
              <!-- Bouton pour afficher le formulaire -->
              <button
                v-if="user.role === 'referent'"
                @click="afficherFormulaire = !afficherFormulaire"
                class="mb-3 text-2xl px-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                {{ afficherFormulaire ? "Annuler" : "" }}
                <span v-if="!afficherFormulaire">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="45"
                    height="45"
                    fill="currentColor"
                    viewBox="1 3.5 14 9.5"
                  >
                    <path
                      d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
                    />
                  </svg>
                </span>
              </button>
            </div>
          </div>
          <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>
          <!-- Formulaire -->
          <div
            v-if="afficherFormulaire"
            class="lg:shadow-2xl lg:fixed lg:size-[30%] lg:h-[76%] lg:top-[10rem] lg:left-[50%] lg:overflow-y-auto p-4 border rounded bg-gray-100 lg:"
          >
            <h3 class="text-xl font-semibold mb-3">
              {{ afficherEdition ? "Modifier un membre" : "Ajouter un membre" }}
            </h3>
            <form
              @submit.prevent="
                afficherEdition ? mettreAJourMembre() : ajouterMembre()
              "
              class="text-black"
            >
              <input
                v-model="nouveauMembre.firstName"
                type="text"
                placeholder="Nom"
                required
                class="input"
              />
              <input
                v-model="nouveauMembre.lastName"
                type="text"
                placeholder="Prénom"
                required
                class="input"
              />
              <input
                v-model="nouveauMembre.profession"
                type="text"
                placeholder="Profession"
                class="input"
              />
              <input
                v-model="nouveauMembre.contact"
                type=""
                placeholder="Contact"
                class="input"
              />
              <input
                v-model="nouveauMembre.address"
                type="text"
                placeholder="Adresse"
                class="input"
              />
              <div class="flex justify-between items-center gap-2">
                <p class="w-[30%]">Date d'arrivée</p>
                <label class="w-[70%] mt-2 text-black">
                  <input
                    v-model="nouveauMembre.dateArrivee"
                    type="date"
                    class="input"
                  />
                </label>
              </div>

              <div class="flex justify-between items-center gap-2">
                <p class="w-[30%]">Date de RDV_Pst</p>
                <label class="w-[70%] mt-2 text-black">
                  <input
                    v-model="nouveauMembre.rdvPasteur"
                    type="date"
                    placeholder="Date de RDV avec Pasteur"
                    class="input"
                  />
                </label>
              </div>

              <label class="block mt-2 text-black">
                <textarea
                  class="input w-full p-2 border rounded"
                  v-model="nouveauMembre.requetePriere"
                  placeholder="Requête de prière"
                  rows="3"
                ></textarea>
              </label>

              <label class="block mt-2 text-black">
                <textarea
                  class="input w-full p-2 border rounded"
                  v-model="nouveauMembre.note"
                  placeholder="Commentaire du Référent"
                  rows="3"
                ></textarea>
              </label>

              <label class="block mt-2 text-black">
                <input v-model="nouveauMembre.baptise" type="checkbox" />
                Baptisé
              </label>

              <label class="block mt-2 text-black">
                <input
                  v-model="nouveauMembre.veuxFaireBapteme"
                  type="checkbox"
                />
                Je desire me faire baptiser
              </label>
              <label class="block mt-2 text-black">
                <input v-model="nouveauMembre.veuxIntegrer" type="checkbox" />
                Je veux intégrer l'église
              </label>

              <label class="block mt-2 text-black">
                <input v-model="nouveauMembre.dePassage" type="checkbox" />
                Je suis de passage
              </label>

              <label class="block mt-2 text-black">
                <input
                  v-model="nouveauMembre.nouvelleNaissance"
                  type="checkbox"
                />
                Je donne ma vie à Christ
              </label>

              <label class="block mt-2 text-black">
                <input
                  v-model="nouveauMembre.renouvelleMonEngagement"
                  type="checkbox"
                />
                Je renouvelle mon engagement avec Christ
              </label>

              <label class="block mt-2 text-black">
                <input
                  v-model="nouveauMembre.commentAvoirRelationChrist"
                  type="checkbox"
                />
                J'aimerais savoir comment avoir une relation avec Christ
              </label>

              <label class="block mt-2 text-black">
                <input
                  v-model="nouveauMembre.desireRencontrerPasteur"
                  type="checkbox"
                />
                J'aimerais parler au Pasteur
              </label>

              <label class="block mt-2 text-black">
                <input
                  v-model="nouveauMembre.contactRegulier"
                  type="checkbox"
                />
                Contact_Régulier
              </label>

              <label class="block mt-2 text-black">
                <input v-model="nouveauMembre.visiteMaison" type="checkbox" />
                Visite_Maison
              </label>
              <label class="block mt-2 text-black">
                <p class="font-semibold">Suivi sur 4 Dimanches :</p>
                <div class="flex flex-col gap-1 mt-1">
                  <label class="text-black"
                    ><input
                      type="checkbox"
                      v-model="nouveauMembre.suivi.dimanche1"
                    />
                    Dimanche 1</label
                  >
                  <label class="text-black"
                    ><input
                      type="checkbox"
                      v-model="nouveauMembre.suivi.dimanche2"
                    />
                    Dimanche 2</label
                  >
                  <label class="text-black"
                    ><input
                      type="checkbox"
                      v-model="nouveauMembre.suivi.dimanche3"
                    />
                    Dimanche 3</label
                  >
                  <label class="text-black"
                    ><input
                      type="checkbox"
                      v-model="nouveauMembre.suivi.dimanche4"
                    />
                    Dimanche 4</label
                  >
                </div>
              </label>
              <button
                type="submit"
                class="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                {{ afficherEdition ? "Mettre à jour" : "Enregistrer" }}
              </button>
              <p v-if="error">{{ error }}</p>
            </form>
          </div>
          <!-- Modal -->
          <div
            v-if="afficherModal"
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <div
              class="bg-white rounded-lg shadow-lg p-6 w-[90%] h-[90%] overflow-y-auto"
            >
              <h2
                class="text-xl font-bold mb-4 rounded-lg bg-slate-200 flex justify-around"
              >
                <strong>
                  {{ membreSelectionne.firstName }}
                  {{ membreSelectionne.lastName }}
                </strong>
                <strong>
                  📅
                  {{ membreSelectionne.dateArrivee?.substring(0, 10) }}
                </strong>
              </h2>

              <strong class="flex flex-nowrap mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z"
                  />
                </svg>
                Profession : {{ membreSelectionne.profession }}
              </strong>

              <strong class="flex flex-nowrap mb-3"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M14.25 9.75v-4.5m0 4.5h4.5m-4.5 0 6-6m-3 18c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 0 1 4.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 0 0-.38 1.21 12.035 12.035 0 0 0 7.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 0 1 1.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 0 1-2.25 2.25h-2.25Z"
                  />
                </svg>
                Contact : {{ membreSelectionne.contact }}
              </strong>

              <strong class="flex mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                  />
                </svg>
                Adresse : {{ membreSelectionne.address }}
              </strong>

              <strong class="flex flex-nowrap mb-3">
                👏🏻Veut voir le Pst:
                {{ membreSelectionne.desireRencontrerPasteur ? "✅" : "❌" }}
              </strong>

              <strong class="flex flex-nowrap mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                  />
                </svg>
                Date RDV Pst:
                {{ membreSelectionne.dateArrivee?.substring(0, 10) }}
              </strong>

              <strong class="flex flex-nowrap mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>
                Visite maison :{{
                  membreSelectionne.visiteMaison ? "✅" : "❌"
                }}
              </strong>

              <strong class="flex flex-nowrap mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                  /></svg
                >Veut Intégrer :
                {{ membreSelectionne.veuxIntegrer ? "✅" : "❌" }}
              </strong>

              <p class="mb-3">
                <strong>🚶🏽‍♂️ De Passage :</strong>
                {{ membreSelectionne.dePassage ? "✅" : "❌" }}
              </p>

              <p class="flex flex-nowrap mb-3">
                <strong>💧 Baptiser :</strong>
                {{ membreSelectionne.baptise ? "✅" : "❌" }}
              </p>
              <p class="flex flex-nowrap mb-3">
                <strong>💧 Veut se faire baptisé :</strong>
                {{ membreSelectionne.veuxFaireBapteme ? "✅" : "❌" }}
              </p>
              <p class="flex mb-3">
                <strong>🧎🏻‍♂️ Comment Avoir Relation Christ: </strong>
                {{ membreSelectionne.commentAvoirRelationChrist ? "✅" : "❌" }}
              </p>
              <p class="flex flex-nowrap mb-3">
                <strong>🙌 Renouvelle Mon Engagement :</strong>
                {{ membreSelectionne.renouvelleMonEngagement ? "✅" : "❌" }}
              </p>

              <p class="flex flex-nowrap mb-3">
                <strong>🧍🏽‍♂️ Nouvelle Naissance :</strong>
                {{ membreSelectionne.nouvelleNaissance ? "✅" : "❌" }}
              </p>

              <strong class="flex flex-nowrap mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125Z"
                  />
                </svg>
                Suivi sur les 4 Dimanches :
              </strong>

              <div class="flex flex-nowrap mb-3 gap-4">
                <span>
                  Dim 1 : {{ membreSelectionne.suivi?.dimanche1 ? "✅" : "❌" }}
                </span>
                <span>
                  Dim 2 : {{ membreSelectionne.suivi?.dimanche2 ? "✅" : "❌" }}
                </span>
                <span>
                  Dim 3 : {{ membreSelectionne.suivi?.dimanche3 ? "✅" : "❌" }}
                </span>
                <span>
                  Dim 4 : {{ membreSelectionne.suivi?.dimanche4 ? "✅" : "❌" }}
                </span>
              </div>

              <strong class="mb-3">
                🧎🏻‍♂️ requête:
                <p>{{ membreSelectionne.requetePriere }}</p>
              </strong>
              <p>
                <strong class="flex mt-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                    />
                  </svg>
                  Commentaire:
                </strong>
                {{ membreSelectionne.note }}
              </p>
              <div  
              class="flex justify-between mt-4 text-right">
                
                  <div  v-if="membreSelectionne?.referentId">
                    <span v-for="item in referents" :key="item.referent._id">
                      <span
                        v-if="item.referent._id === membreSelectionne.referentId"
                      >
                        Référent(e):
                        <strong
                          >{{ item.referent.prenom }}
                          {{ item.referent.nom }}</strong
                        >
                      </span>
                    </span>
                  </div>
                  
                <button
                  @click="fermerModal"
                  class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>

          <!-- Statistiques -->
          <div class="flex flex-wrap justify-around mt-6 gap-4">
            <div
              class="flex flex-col font-semibold mb-2 box-border h-32 w-32 p-1 border-4"
            >
              <strong class="mx-auto">Total: </strong>
              <strong class="mx-auto">{{ totalMembres }}</strong>
            </div>

            <div
              class="flex flex-col font-semibold mb-2 box-border h-32 w-32 p-1 border-4"
            >
              <strong class="mx-auto">Veut Intégrer:</strong>
              <strong class="mx-auto"> {{ totalVIE }}</strong>
            </div>

            <div
              class="flex flex-col font-semibold mb-2 box-border h-32 w-32 p-1 border-4"
            >
              <strong class="mx-auto">De Passage: </strong>
              <strong class="mx-auto"> {{ dePassage }}</strong>
            </div>

            <div
              class="flex flex-col font-semibold mb-2 box-border h-32 w-32 p-1 border-4"
            >
              <strong class="mx-auto"> Veux être baptisé: </strong>
              <strong class="mx-auto"> {{ commentAvoirRelationChrist }}</strong>
            </div>

            <div
              class="flex flex-col font-semibold mb-2 box-border h-32 w-32 p-1 border-4"
            >
              <strong class="mx-auto">Total Baptisé: </strong>
              <strong class="mx-auto"> {{ totalBaptises }}</strong>
            </div>

            <div
              class="flex flex-col font-semibold mb-2 box-border h-32 w-32 p-1 border-4"
            >
              <strong class="mx-auto">Nouvelle Naissance: </strong>
              <strong class="mx-auto"> {{ nouvelleNaissance }}</strong>
            </div>

            <div
              class="flex flex-col font-semibold mb-2 box-border h-32 w-32 p-1 border-4"
            >
              <strong class="mx-auto"> Renouvelle Mon Engagement: </strong>
              <strong class="mx-auto"> {{ renouvelleMonEngagement }}</strong>
            </div>
            <div
              class="flex flex-col font-semibold mb-2 box-border h-32 w-32 p-1 border-4"
            >
              <strong class="mx-auto"> Veut rencontrer le pasteur: </strong>
              <strong class="mx-auto"> {{ desireRencontrerPasteur }}</strong>
            </div>
          </div>
        </div>
      </div>
      <!-- Afficharge admin & leader -->
      <div class="lg:mt-16 lg:fixed lg:top-[5rem] lg:left-[50%] lg:w-[40%]">
        <!-- Cration d'un référents par un leader LEADER -->
        <div v-if="user.role === 'leader' || user.role === 'admin'">
          <CreerReferent
            class="my-4 shadow-2xl font-bold bg-blue-500 border-2 border-gray-200 px-2rounded-lg px-2 py-1"
          />
        </div>
        <div v-if="user.role === 'leader' || user.role === 'admin'">
          <!-- Tableau contenant le texte -->
          <div
            class="my-4 shadow-2xl text-center bg-blue-500 text-white border-2 border-gray-200 px-2rounded-lg px-2 py-1"
          >
            <button
              @click="toggleReferent"
              class="text-xl px- py-1 rounded font-bold"
            >
              {{
                showReferent
                  ? "Fermer la liste"
                  : "Liste des référents et membres liés"
              }}
            </button>
          </div>
          <!-- Composant affiché/masqué selon l'état -->
          <div
            v-if="showReferent"
            class="mt-4 h-[32rem] overflow-y-auto shadow-2xl border-gray-200 border-[1px] rounded-lg bg-white p-1"
          >
            <ReferentMembre />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.input {
  display: block;
  margin-top: 0.5rem;
  padding: 8px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
  
}

</style>
