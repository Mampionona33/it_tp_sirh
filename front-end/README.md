# it_tp_sirh - FRONT-END

## Description

Le projet it_tp_sirh est une application de gestion de paie à l'origine développée en React.js. Cependant, elle est devenue hybride JavaScript/TypeScript grâce à l'utilisation du module CRACO. Cette approche permet de personnaliser l'application sans avoir besoin de procéder à une éjection complète.

Le projet vise à proposer une solution exhaustive pour la gestion de la paie, incluant les fonctionnalités suivantes : calcul des rémunérations, génération de fiches de paie au format PDF, production de la déclaration nominative des salariés sous forme de fichier XLSX, ainsi que la création des déclarations OMSI et IRSA trimestrielles.

## Utilisation de Make

Le projet utilise le système de build Make pour faciliter l'exécution de diverses tâches et commandes. Cela simplifie le processus de développement et permet aux utilisateurs de gérer l'application de manière efficace.

## Initialisation

Pour initialiser le projet et récupérer la branche "main" du dossier front-end, exécutez les commandes suivantes :

```bash
git init <frontend_directory>
cd <frontend_directory>
git remote add origin https://github.com/Mampionona33/it_tp_sirh.git
git sparse-checkout init --cone
git sparse-checkout set front-end
git pull origin main
```

Assurez-vous de remplacer `<frontend_directory>` par le nom du répertoire que vous souhaitez utiliser pour le front-end.

## Installation de Make

Assurez-vous que Make est installé sur votre système pour utiliser les commandes du Makefile.

## Configuration du nom d'hôte

Pour configurer le nom d'hôte, exécutez la commande suivante :

```bash
make open-hosts
```

Cela ouvrira le fichier hosts pour que vous puissiez le modifier.

## Construction et démarrage du serveur

Pour construire et démarrer le serveur, exécutez la commande suivante :

```bash
make build-and-serve
```

## Arrêt du serveur

Pour arrêter le serveur, exécutez la commande suivante :

```bash
make down
```

## Mise à jour de l'application

Pour mettre à jour l'application, exécutez la commande suivante :

```bash
make build-and-serve
```

## Édition du fichier hosts

Pour ouvrir le fichier hosts pour son édition, exécutez la commande suivante :

```bash
make open-hosts
```

## Ajout d'un hôte

Pour ajouter un hôte au fichier hosts, vous pouvez utiliser la commande suivante :

```bash
make add-host SERVER_NAME=<nom_du_serveur>
```

Assurez-vous de remplacer `<nom_du_serveur>` par le nom de votre serveur.

## Suppression d'un hôte

Pour supprimer un hôte du fichier hosts, exécutez la commande suivante :

```bash
make remove-host SERVER_NAME=<nom_du_serveur>
```

Assurez-vous de remplacer `<nom_du_serveur>` par le nom de votre serveur.

## Liste complète des commandes Makefile

- `make reset-docker` : Nettoie l'environnement Docker en supprimant tous les conteneurs et les images.
- `make remove-docker_image` : Supprime une image Docker spécifique.
- `make down` : Arrête tous les conteneurs Docker.
- `make build` : Construit les conteneurs Docker.
- `make build-and-serve` : Construit et démarre les conteneurs Docker.
- `make run-container` : Démarre les conteneurs Docker.
- `make open-hosts` : Ouvre le fichier hosts pour édition.
- `make add-host` : Ajoute un hôte au fichier hosts.
- `make remove-host` : Supprime un hôte du fichier hosts.