# Test Bliink
Voici le test réalisé en prévision de l'entretien. Il utilise NodeJS et MongoDB.
## Dépendances
Pour installer les dépendances, aller à la racine du dossier et lancer la commande **npm install**
## Mise en place
Afin de lancer le serveur, vous devez au préalable lancer la base de données mongo, avec la commande **mongod** dans un terminal. Si mongodb n'est pas installé, utilisez la commande **sudo apt-get install -y mongodb-org**.
Une fois mongodb mis en place, vous pouvez lancer  le serveur avec la commande **node server.js**. "Server listening" devrait s'afficher, vous pouvez maintenant utiliser les routes spécifiées ci dessous.
## Routes de l'API
* **GET /api/events** : permet de récupérer la liste des événements disponibles
* **POST /api/events** : permet d'ajouter un événement à la base, il prend un JSON au format suivant :
 {
	"name": "",
	"ref": ""
}
* **GET /api/events/:id** : permet de récupérer seulement un événement, suivant son id
* **GET /api/dashboard** : renvoie une page HTML avec la liste des événements
* **GET /api/deleteEvent/:id** : supprime l'élément correspondant à l'id passé