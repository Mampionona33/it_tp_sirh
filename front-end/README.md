## Table des matières

1. [Description](#description)
2. [Technologies utilisées](#technologies-utilisees)
3. [Initialisation](#initialisation)
4. [Requirement "Docker" et "Make"](#utilisation-de-make)
5. [Installation de Make](#installation-de-make)
6. [Installation Docker](#installation-docker)
6. [Installation de Nginx](#installation-de-nginx)
7. [Configuration Reverse Proxy Nginx](#configuration-reverse-proxy-nginx)
8. [Lancement de l'application](#lancement-de-lapplication)

---

<div id='description'/>

## Description
Le projet vise à proposer une solution exhaustive pour la gestion de la paie, incluant les fonctionnalités suivantes : calcul des rémunérations, génération de fiches de paie au format PDF, production de la déclaration nominative des salariés sous forme de fichier XLSX, ainsi que la création des déclarations OMSI et IRSA trimestrielles.
---


<div id='technologies-utilisees'/>

## Technologies utilisees

- [Make](https://makefiletutorial.com/)
- [Docker](https://www.docker.com/)
- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [CRACO](https://github.com/coreui/coreui-free-react-admin-template/blob/main/CRACO/README.md)
- [React.js](https://reactjs.org/)

---

## Initialisation

Pour initialiser le projet et le cloner, exécutez les commandes suivantes :

```bash
# Creer le dossier principal
mkdir <main_directory> && cd <main_directory>

# Cloner le projet
git init
git clone --depth=1 https://github.com/Mampionona33/it_tp_sirh.git

# Creer le dossier front-end
cd it_tp_sirh
git sparse-checkout set front-end
git sparse-checkout set --no-cone front-end

# Copier le contenu du dossier front-end dans le dossier courant
cp -r front-end/* ./

# Supprimer le dossier front-end
rm -rf front-end

```

Assurez-vous de remplacer `<main_directory>` par le nom du répertoire que vous souhaitez utiliser pour le projet.

<div id='utilisation-de-make'/>

## Remarque : Utilisation de Make

Le projet utilise le système de build Make pour faciliter l'exécution de diverses tâches et commandes. Cela simplifie le processus de développement et permet aux utilisateurs de gérer l'application de manière efficace.

---

<div id='installation-de-make'/>

## Installation de Make

Assurez-vous que Make est installé sur votre système pour utiliser les commandes du Makefile.

[Installation make sous Linux](https://www.geeksforgeeks.org/how-to-install-make-on-ubuntu/)

[Installation make sous Windows](https://gnuwin32.sourceforge.net/packages/make.htm)

<div id='lancement-du-serveur>

## Build et Lancement du Serveur
Pour construire et lancer le serveur, utilisez les commandes suivantes :

```bash
make build-and-serve
```
 ou lancer succesivement les commandes suivantes :

```bash
make build
make serve
```
