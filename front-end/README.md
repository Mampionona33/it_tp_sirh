## Table des matières

1. [Description](#description)
2. [Technologies utilisées](#technologies-utilisees)
3. [Initialisation](#initialisation)
4. [Utilisation de Make](#utilisation-de-make)
5. [Installation de Make](#installation-de-make)
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

[Installation de Nginx](https://docs.nginx.com/nginx/admin-guide/installing-nginx/installing-nginx-open-source/)

👉 Vous pouvez exécuter la commande suivante pour l'installer si vous avez déjà installé `make` sur votre ordinateur :
```javascript 
make install-nginx
```

<div id='configuration-reverse-proxy-nginx'/>

## Configuration Reverse Proxy Nginx

#### Création du fichier configuration Reverse Proxy Nginx
Créez un nouveau fichier de configuration dans `/etc/nginx/sites-available/` pour votre application. Par exemple, créez un fichier `<nom_du_serveur>`

```bash
sudo nano /etc/nginx/sites-available/<nom_du_serveur>
```
Colléz le contenu suivant :

```bash
server {
    listen 80;
    server_name <nom_du_serveur>;

    location / {
        proxy_pass http://localhost:3000; # Ne pas modifier
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```
Créez un lien symbolique pour activer le fichier de configuration que vous avez créé dans `sites-available`

```bash
sudo ln -s /etc/nginx/sites-available/<nom_du_serveur> /etc/nginx/sites-enabled/
```

Autorisation du serveur HTTP:
```bash
sudo ufw allow http
```

Autorisation du serveur HTTPS:
```bash
sudo ufw allow https
```

Lancer le serveur Nginx:
```bash
sudo systemctl start nginx
```

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
