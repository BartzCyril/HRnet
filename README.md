# HRnet — migration d'une application RH de jQuery vers React

> Application interne de gestion des employés de WealthHealth, réécrite en React + TypeScript pour remplacer jQuery et ses plugins, avec une fenêtre modale publiée sur npm et des tests de performance avant/après.

![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Redux](https://img.shields.io/badge/Redux_Toolkit-764ABC?logo=redux&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?logo=bootstrap&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?logo=githubactions&logoColor=white)

## Démo en ligne

**[bartzcyril.github.io/HRnet](https://bartzcyril.github.io/HRnet/)** : créez un employé avec le formulaire, puis consultez-le dans la liste « View Current Employees ». La liste est préremplie avec 25 employés fictifs générés par Faker.

## Sujet

Projet de formation OpenClassrooms. WealthHealth, une grande société financière, utilise une application web interne, HRnet, pour gérer les dossiers de ses employés. Elle reposait sur jQuery et plusieurs plugins jQuery, source de lenteurs et de bugs.

La mission :

- convertir HRnet en React en suivant les bonnes pratiques ;
- remplacer chaque plugin jQuery par un composant React, dont **un réécrit par moi-même et publié sur npm** ;
- mesurer les performances de l'ancienne et de la nouvelle version avec Lighthouse.

## Fonctionnalités

- **Création d'un employé** : prénom, nom, date de naissance, date d'embauche, adresse, État et département
- **Validation du formulaire** : champs obligatoires, dates dans le futur refusées, employé mineur refusé ; les messages s'affichent dès qu'un champ est modifié ou à l'envoi
- **Fenêtre modale** de confirmation : [`modal-cyril-bartz`](https://www.npmjs.com/package/modal-cyril-bartz), mon composant ([dépôt Hrnet-Modal](https://github.com/BartzCyril/Hrnet-Modal))
- **Liste des employés** : tableau triable, paginé, avec recherche
- **État global** partagé entre les pages avec Redux Toolkit

## Remplacement des plugins jQuery

| Plugin jQuery | Remplacé par |
| --- | --- |
| jQuery Modal | [`modal-cyril-bartz`](https://www.npmjs.com/package/modal-cyril-bartz) (composant maison) |
| DataTables | `react-data-table-component` |
| jQuery UI Datepicker | `react-datetime-picker` |
| Selectmenu | `react-select` |

## Performances (Lighthouse)

| Page | Score jQuery | Score React | LCP jQuery | LCP React |
| --- | --- | --- | --- | --- |
| Création d'employé | 90 | **96** | 2,9 s | **2,1 s** |
| Liste des employés | 67 | **76** | 3,1 s | **2,2 s** |

Les rapports complets sont dans le dossier [`performance/`](performance/).

## Compétences acquises

- **Migration jQuery → React** : découpage en composants, hooks, gestion d'état
- **TypeScript** : props et données typées
- **Redux Toolkit** : slice et store pour partager la liste des employés
- **Hook personnalisé** (`useFormErrors`) pour centraliser la validation
- **Création et publication d'une bibliothèque React sur npm**
- **Audit de performance** avec Lighthouse et comparaison avant/après
- **Déploiement continu** sur GitHub Pages avec GitHub Actions, routage d'une SPA via `404.html`

## Lancer en local

Prérequis : Node.js 18 ou plus récent.

```bash
git clone https://github.com/BartzCyril/HRnet.git
cd HRnet
npm install
npm run dev       # http://localhost:5173/HRnet/
```

```bash
npm run build     # génère dist/
npm run preview   # sert le build
```

## Déploiement

Chaque push sur `main` lance le workflow [`deploy.yml`](.github/workflows/deploy.yml) : build Vite puis publication sur GitHub Pages.
