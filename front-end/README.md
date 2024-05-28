![LogoLs](https://github.com/Mampionona33/it_tp_sirh/assets/50689325/7f6496d8-c43b-4c98-b7eb-7d863c20e34e)

# FRONT-END

## Table des matières

1. [Description](#description)
2. [Technologies utilisées](#technologies-utilisées)
3. [Prérequis](#prerequis)
4. [Initialisation](#initialisation)
5. [Installation de Make](#installation-de-make)
6. [Installation de Docker](#installation-de-docker)
7. [Lancement de l'application](#lancement-de-lapplication)
8. [Liste des commandes Make](#liste-des-commandes-make)
9. [Alternative commande Make](#alternative-commande-make)

---

<div id='description'/>

## Description

Ce projet propose une solution complète pour la gestion de la paie, incluant les fonctionnalités suivantes : calcul des rémunérations, génération de fiches de paie au format PDF, production de la déclaration nominative des salariés sous forme de fichier XLSX, ainsi que la création des déclarations trimestrielles OMSI et IRSA.

<div id='technologies-utilisées'/>

## Technologies utilisées

- [Make](https://makefiletutorial.com/)
- [Docker](https://www.docker.com/)
- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [CRACO](https://github.com/gsoft-inc/craco)
- [React.js](https://reactjs.org/)

---

<div id="prerequis"/>

## Prérequis

Assurez-vous d'avoir Git, Docker, Docker Compose et Make installés sur votre machine.

- Git est utilisé pour cloner le projet.
- Make simplifie l'exécution de diverses commandes et tâches.
- Docker assure un environnement de développement et de déploiement identique.
- Docker Compose facilite la gestion des conteneurs.

<div id='initialisation'/>

## Initialisation

Pour initialiser le projet et le cloner, exécutez les commandes suivantes :

```bash
# Créer le dossier principal
mkdir <main_directory> && cd <main_directory>

# Cloner le projet
git init
git clone --depth=1 https://github.com/Mampionona33/gestion_de_paie.git

# Créer le dossier front-end
cd it_tp_sirh
git sparse-checkout set front-end
git sparse-checkout set --no-cone front-end

# Copier le contenu du dossier front-end dans le dossier courant
cp -r front-end/* ./

# Supprimer le dossier front-end
rm -rf front-end
```

Assurez-vous de remplacer `<main_directory>` par le nom du répertoire que vous souhaitez utiliser pour le projet.

<div id='installation-de-make'/>

## Installation de Make

Assurez-vous que Make est installé sur votre système pour utiliser les commandes du Makefile.

- [Installation de Make sous Linux](https://www.geeksforgeeks.org/how-to-install-make-on-ubuntu/)
- [Installation de Make sous Windows](https://gnuwin32.sourceforge.net/packages/make.htm)

<div id="installation-de-docker"/>

## Installation de Docker

- [Installation de Docker Engine sur Ubuntu](https://docs.docker.com/engine/install/ubuntu/)
- [Installation de Docker Compose](https://docs.docker.com/compose/install/)

<div id='lancement-de-lapplication'/>

## Lancement de l'application

Pour compiler et lancer le serveur, utilisez la commande suivante :

```bash
make build-and-serve
```

ou lancez successivement les commandes suivantes :

```bash
make build
make serve
```

<div id="liste-des-commandes-make"/>

## Liste des commandes Make

Voici les commandes Make disponibles :

```bash
# Réinitialiser Docker
make reset-docker
```

```bash
# Supprimer le cache Docker
make remove-cache-docker
```

```bash
# Supprimer les images Docker
make remove-image-docker
```

```bash
# Arrêter et supprimer les conteneurs Docker
make down
```

```bash
# Compiler le projet
make build
```

```bash
# Compiler et lancer le serveur
make build-and-serve
```

```bash
# Lancer le serveur
make serve
```

---

<div id='alternative-commande-make'/>

## Alternative commande Make

**Si vous n'avez pas installé Make, vous pouvez utiliser les commandes suivantes pour compiler et lancer le serveur:**

```bash
# Compiler le serveur
docker compose build --no-cache
```

```bash
# Lancer le serveur
docker compose up
```
