<script setup></script>

<template>
  <div
    class="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md lg:mt-4 lg:left-1/2 lg:transform lg:translate-x-1/2"
  >
    <router-link
      to="../dashboard"
      class="text-center h-[2rem] w-[5rem] bg-blue-400 text-white rounded-lg hover:bg-red-600"
    >
      Retour
    </router-link>
    <!-- Titre principal -->
    <h1 class="text-3xl font-bold text-blue-600 mb-6 text-center">
      Guide d'Utilisation de l'Application ADN
    </h1>

    <!-- Introduction -->
    <div class="mb-8">
      <p class="text-gray-700 leading-relaxed">
        Bienvenue dans l'application
        <span class="font-semibold">ADN (Accueil Des Nouveaux)</span>. Ce guide
        vous aidera à comprendre comment naviguer dans l'application et utiliser
        ses différentes fonctionnalités selon votre rôle.
      </p>
    </div>

    <!-- Navigation Générale -->
    <h2 class="text-2xl font-semibold text-gray-800 border-b pb-2 mb-4">
      Navigation Générale
    </h2>
    <div class="space-y-2 text-gray-700">
      <p>
        Lors de votre connexion, vous serez dirigé vers intro-screen vous
        souhaitant la bienvenue pendant 25 seconded et ensuite vers votre
        <strong class="text-blue-500">tableau de bord</strong> personnel.
      </p>
      <ul class="list-disc list-inside space-y-1 ml-4">
        <li>
          <strong>Tableau de Bord :</strong> Résumé des activités selon votre
          rôle.
        </li>
        <li>
          <strong>Menu Principal :</strong> Accès aux sections ("Nouveaux
          Membres", "Suivi", "Statistiques"...).
        </li>
        <li><strong>Notifications :</strong> Alertes et rappels importants.</li>
      </ul>
    </div>

    <!-- Rôles et Permissions -->
    <div class="mt-8">
      <h2 class="text-2xl font-semibold text-gray-800 border-b pb-2 mb-4">
        Rôles et Permissions
      </h2>
      <p class="text-gray-700 mb-4">
        Selon votre rôle, vous aurez accès à différentes fonctionnalités :
      </p>

      <div class="space-y-6">
        <div class="bg-white p-4 rounded-lg shadow">
          <h3 class="text-xl font-bold text-blue-600">Référent</h3>
          <ul class="list-disc list-inside ml-4 text-gray-700">
            <li>Suivi des nouveaux membres assignés.</li>
            <li>Ajout de notes et mise à jour des suivis.</li>
            <li>Visualisation de l'évolution des membres.</li>
          </ul>
        </div>

        <div class="bg-white p-4 rounded-lg shadow">
          <h3 class="text-xl font-bold text-blue-600">Leader</h3>
          <ul class="list-disc list-inside ml-4 text-gray-700">
            <li>Supervision des référents.</li>
            <li>Consultation des suivis.</li>
            <li>Relance des référents inactifs.</li>
          </ul>
        </div>

        <div class="bg-white p-4 rounded-lg shadow">
          <h3 class="text-xl font-bold text-blue-600">Super Admin / Pasteur</h3>
          <ul class="list-disc list-inside ml-4 text-gray-700">
            <li>Accès complet à tous les utilisateurs.</li>
            <li>Gestion des comptes (création, suppression).</li>
            <li>Statistiques globales.</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Gestion des Utilisateurs -->
    <div class="mt-10">
      <h2 class="text-2xl font-semibold text-gray-800 border-b pb-2 mb-4">
        Ajout et Gestion des Utilisateurs
      </h2>

      <div class="space-y-6">
        <div>
          <h3 class="text-xl font-semibold text-blue-500">
            Référent / Ajout d'un Nouveaux Membres
          </h3>
          <ol class="list-decimal list-inside ml-4 text-gray-700 space-y-1">
            <li>Ajoutez un "Nouveau Membre".</li>
            <li class="flex gap-2">
              Cliquez sur
              <span>
                <svg
                  class="bg-blue-700 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="1 3.5 14 9.5"
                >
                  <path
                    d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
                  />
                </svg>
              </span>
            </li>
            <li>
              Remplissez la fiche avec les informations nécessaires et très
              important, la date d'arriver.
            </li>
            <li>
              Pour modification des inforamtion d'un suivi pour la mis a jour,
            </li>
            <li class="flex">
              cliquez sur
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
            </li>
            <li>
              Pour la visualisation des informations d'un suivi, cliquez sur
            </li>
            <li class="flex gap-2">
              cliquez sur
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
            </li>
            <li>
              La recherche périodique permet de savoir exactement le nombre de
              nouveau sur une période donnée. Et pour le faire, il faut prendre
              une date de début et une date de fin.
            </li>
            <li>
              Les stats en bas, permet de voir le total de suivi et des infos
              clés importante.
            </li>
          </ol>
        </div>
        <div>
          <h3 class="text-xl font-semibold text-blue-500">
            Leaders et Admin(Pasteur)/ "Création de Référents"
          </h3>
          <ol class="list-decimal list-inside ml-4 text-gray-700 space-y-1">
            <li>Ajoutez un "Nouveaux Référent".</li>
            <li class="flex gap-2">
              Cliquez sur
              <span>
                <svg
                  class="bg-blue-700 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="1 3.5 14 9.5"
                >
                  <path
                    d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
                  />
                </svg>
              </span>
            </li>
            <li>Le log.session est égal au NOM.Prénom.</li>
            <li>Remplissez les informations requises et sauvergarder.</li>
            <li>Assignez un leader.</li>
          </ol>
          <h4 class="text-xl font-semibold text-blue-500">
            Liste des Référents avec les membres liés.
          </h4>
          <ol class="list-decimal list-inside ml-4 text-gray-700 space-y-1">
            <li>Liste des référents et membres liés</li>
            <li>Cher Pst/leader, cliquez sur la barre liste des référents</li>
            <li>
              Vous verrez la liste des référents et les membres qui leur sont
              assignés.
            </li>
            <li>
              Vous pouvez cliquer sur un référent pour voir les détails de ses
              membres.
            </li>
            <li>
              Vous pouvez également visualiser les information d'un suivi en
              cliquant sur l'oeil qui est sur le nom de la personne.
            </li>
          </ol>
        </div>

        <div>
          <h3 class="text-xl font-semibold text-blue-500">
            Admin/Pasteur (Ajout de Leaders)
          </h3>
          <ol class="list-decimal list-inside ml-4 text-gray-700 space-y-1">
            <li>Accès à tous les interfaces.</li>
            <li>Laisser des commentaires</li>
            <li>Possibilité de relancer le(s) leader(s)</li>
          </ol>
        </div>
      </div>
    </div>

    <!-- Fonctionnalités -->
    <div class="mt-10">
      <h2 class="text-2xl font-semibold text-gray-800 border-b pb-2 mb-4">
        Fonctionnalités Spécifiques
      </h2>

      <div class="space-y-6">
        <div>
          <h3 class="text-xl font-semibold text-blue-500">Suivi des Membres</h3>
          <p class="text-gray-700">
            - Ajoutez des notes de suivi depuis la fiche du membre.
          </p>
          <p class="text-gray-700">
            - Indiquez la date et le type de suivi (visite, appel, etc.).
          </p>
          <p class="text-gray-700">
            - Mettez à jour régulièrement les visites et contacts.
          </p>
          <p>- Lorsque vous vous connectez et que la fenêtre de Bienvenue s'affiche, vous avez la possibilité de la fermer en cliquant sur <strong class="text-red-600 border-solid border-l-zinc-950 bg-white px-2">x</strong></p>
        </div>

        <div>
          <h3 class="text-xl font-semibold text-blue-500">
            Gestion des Rendez-vous
          </h3>
          <p class="text-gray-700">
            - Planifiez des rendez-vous avec le pasteur depuis la fiche du
            membre.
          </p>
          <p class="text-gray-700">
            - Indiquez la date et l'heure puis sauvegardez.
          </p>
        </div>
      </div>
    </div>

    <!-- Conclusion -->
    <p class="mt-10 text-center text-gray-600">
      ✅ Nous espérons que ce guide vous aidera à tirer le meilleur parti de
      l'application ADN. Pour toute question, contactez l'équipe de support
      Informatique de la MDT(La Maison De la Transformation).
    </p>
  </div>
</template>

<style></style>
