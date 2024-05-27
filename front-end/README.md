## Table des matières

1. [Description](#description)
2. [Technologies utilisées](#technologies-utilisees)
3. [Initialisation](#initialisation)
3. [Utilisation de Make](#utilisation-de-make)
5. [Installation de Make](#installation-de-make)
6. [Ajout d'un hôte](#ajout-dun-hôte)
7. [Configuration manuelle du fichier hosts](#configuration-manuelle-du-fichier-hosts)
8. [Construction et démarrage du serveur](#construction-et-démarrage-du-serveur)
9. [Arrêt du serveur](#arrêt-du-serveur)
10. [Mise à jour de l'application](#mise-à-jour-de-lapplication)
11. [Édition du fichier hosts](#édition-du-fichier-hosts)
12. [Suppression d'un hôte](#suppression-dun-hôte)
13. [Liste complète des commandes Makefile](#liste-complète-des-commandes-makefile)
14. [Option pour les utilisateurs Windows sans Make](#option-pour-les-utilisateurs-windows-sans-make)
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
- [Nginx](https://www.nginx.com/)
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


<div id='installation-nginx'/>

## Installation de Nginx

Assurez-vous que Nginx est installé sur votre ordinateur.
Vous pouvez lancer la commande suivante pour l'installer si vous avez installé Nginx sur votre ordinateur : 
```javascript 
make install-nginx
```

[Installation de Nginx](https://docs.nginx.com/nginx/admin-guide/installing-nginx/installing-nginx-open-source/)



<div id='ajout-dun-hôte'/>

## Ajout d'un hôte

Pour ajouter un hôte au fichier hosts, vous pouvez utiliser la commande suivante :

```bash
make add-host SERVER_NAME=<nom_du_serveur>
```

<div id='configuration-manuelle-du-fichier-hosts'/>

## Configuration manuel du fichier hosts

Pour configurer le nom d'hôte, exécutez la commande suivante :

```bash
make open-hosts
```

Cela ouvrira le fichier hosts pour que vous puissiez le modifier.

<div id='construction-et-démarrage-du-serveur'/>

## Construction et démarrage du serveur

Pour construire et démarrer le serveur, exécutez la commande suivante :

```bash
make build-and-serve
```

<div id='arrêt-du-serveur'/>

## Arrêt du serveur

Pour arrêter le serveur, exécutez la commande suivante :

```bash
make down
```

<div id='mise-à-jour-de-lapplication'/>

## Mise à jour de l'application

Pour mettre à jour l'application, exécutez la commande suivante :

```bash
make build-and-serve
```

<div id='édition-du-fichier-hosts'/>

## Édition du fichier hosts

Pour ouvrir le fichier hosts pour son édition, exécutez la commande suivante :

```bash
make open-hosts
```

Assurez-vous de remplacer `<nom_du_serveur>` par le nom de votre serveur.

<div id='suppression-dun-hôte'/>

## Suppression d'un hôte

Pour supprimer un hôte du fichier hosts, exécutez la commande suivante :

```bash
make remove-host SERVER_NAME=<nom_du_serveur>
```

Assurez-vous de remplacer `<nom_du_serveur>` par le nom de votre serveur.

<div id='liste-complète-des-commandes-makefile'/>

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

---

<div id='option-pour-les-utilisateurs-windows-sans-make'/>

## Option pour les utilisateurs Windows sans Make

### Initialisation

Pour initialiser le projet et récupérer la branche "main" du dossier front-end, exécutez les commandes suivantes dans votre terminal :

```powershell
git init <frontend_directory>
cd <frontend_directory>
git remote add origin https://github.com/Mampionona33/it_tp_sirh.git
git sparse-checkout init --cone
git sparse-checkout set front-end
git pull origin main
```

Assurez-vous de remplacer `<frontend_directory>` par le nom du répertoire que vous souhaitez utiliser pour le front-end.

### Ajout d'un hôte

Ouvrez le fichier hosts pour l'édition :

```powershell
Start-Process notepad C:\Windows\System32\drivers\etc\hosts -Verb RunAs
```

Ajoutez la ligne suivante dans le fichier hosts :

```
127.0.0.1 <nom_du_serveur>
```

Remplacez `<nom_du_serveur>` par le nom de votre serveur.

### Configuration manuelle du fichier hosts

Pour configurer le nom d'hôte, exécutez la commande suivante :

```powershell
Start-Process notepad C:\Windows\System32\drivers\etc\hosts -Verb RunAs
```

Cela ouvrira le fichier hosts pour que vous puissiez le modifier.

### Construction et démarrage du serveur

Pour construire et démarrer le serveur, exécutez les commandes suivantes :

```powershell
docker compose down --remove-orphans
docker compose build --force-rm --no-cache
docker compose up --remove-orphans
```

### Arrêt du serveur

Pour arrêter le serveur, exécutez la commande suivante :

```powershell
docker compose down --remove-orphans
```

### Mise à jour de l'application

Pour mettre à jour l'application, exécutez les commandes suivantes :

```powershell
git pull origin main
docker compose down --remove-orphans
docker compose build --force-rm --no-cache
docker compose up --remove-orphans
```

### Suppression d'un hôte

Pour supprimer un hôte du fichier hosts, ouvrez le fichier hosts pour l'édition :

```powershell
Start-Process notepad C:\Windows\System32\drivers\etc\hosts -Verb RunAs
```

Supprimez la ligne contenant le nom de votre serveur.

En suivant ces instructions, vous pouvez configurer et gérer votre application de gestion de paie sous Windows, sans utiliser Make.
