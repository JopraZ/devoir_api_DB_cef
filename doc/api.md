Présentation générale

Cette API privée permet de gérer les réservations de catways du port de plaisance de Russell.
Elle fournit un ensemble d’endpoints sécurisés permettant :

l’authentification des utilisateurs,

la gestion des utilisateurs,

la gestion des catways,

la gestion des réservations,

la consultation des réservations associées à un catway.

L’API repose sur une architecture REST, utilise MongoDB comme base de données et est sécurisée via JWT (JSON Web Token).

/=============================================

Technologies utilisées

Node.js

Express

MongoDB

Mongoose

JWT (jsonwebtoken)

bcrypt

dotenv

/=============================================

Authentification
Connexion utilisateur

Endpoint :

POST /api/login


Description :
Permet à un utilisateur de s’authentifier et de recevoir un token JWT nécessaire pour accéder aux routes protégées.

Body (JSON) :

{
  "username": "admin",
  "password": "password"
}


Réponse (succès) :

{
  "token": "jwt_token"
}

/=============================================

Sécurité et accès aux routes

Toutes les routes de l’API (à l’exception de /api/login) sont protégées.

Chaque requête doit contenir le header suivant :

Authorization: Bearer <token>


Le token est vérifié via un middleware d’authentification.

/=============================================

Utilisateurs
Récupérer tous les utilisateurs
GET /users


Description :
Retourne la liste de tous les utilisateurs (sans les mots de passe).

Créer un utilisateur
POST /users


Body (JSON) :

{
  "username": "john",
  "email": "john@email.com",
  "password": "password",
  "role": "user"
}

Modifier un utilisateur
PUT /users/:id


Description :
Met à jour les informations d’un utilisateur existant (hors mot de passe et identifiant).

Supprimer un utilisateur
DELETE /users/:id


Description :
Supprime un utilisateur à partir de son identifiant.

/=============================================

Catways
Récupérer tous les catways
GET /catways

Récupérer un catway par numéro
GET /catways/:catwayNumber

Créer un catway
POST /catways


Body (JSON) :

{
  "catwayNumber": 12,
  "catwayType": "long",
  "catwayState": "bon état"
}

Modifier un catway
PUT /catways/:catwayNumber

Supprimer un catway
DELETE /catways/:catwayNumber

/=============================================

Réservations
Récupérer toutes les réservations
GET /reservations

Créer une réservation
POST /reservations


Body (JSON) :

{
  "catwayNumber": 12,
  "clientName": "Jean Dupont",
  "startDate": "2025-01-01",
  "endDate": "2025-01-10"
}

Modifier une réservation
PUT /reservations/:id

Supprimer une réservation
DELETE /reservations/:id

Récupérer les réservations d’un catway
GET /catways/:catwayNumber/reservations


Description :
Retourne toutes les réservations associées à un catway donné.

/=============================================

Initialisation des données

Les données initiales (utilisateurs, catways, réservations) sont injectées dans la base de données à l’aide d’un script seed.js, permettant de peupler la base avant le lancement de l’application.

/=============================================

Conclusion

Cette API respecte les principes REST, met en œuvre une authentification sécurisée et propose un CRUD complet pour l’ensemble des entités du projet.
Elle constitue la base backend de l’application web de gestion des réservations du port de plaisance de Russell.