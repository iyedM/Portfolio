# Portfolio Dynamique - Next.js

Portfolio moderne et dynamique avec un panel d'administration privé pour gérer le contenu.

## ✨ Fonctionnalités

### Portfolio Public
- **Design moderne** orienté Cloud/DevOps/AI avec thème sombre cyberpunk
- **Animations fluides** avec Framer Motion
- **Sections complètes** : Hero, À propos, Compétences, Projets, Expériences, Contact
- **Entièrement responsive** (mobile-first)
- **SEO optimisé** avec Next.js 14

### Panel d'Administration (Privé)
- **Authentification sécurisée** avec JWT
- **CRUD complet** pour :
  - Profil (informations personnelles)
  - Compétences (avec niveaux et catégories)
  - Projets (avec tags et featured)
  - Expériences professionnelles
  - Certifications
- **Interface intuitive** avec feedback en temps réel
- **Données persistantes** en fichier JSON

## 🚀 Installation

### 1. Cloner et installer les dépendances

```bash
cd portfolio
npm install
```

### 2. Configurer les variables d'environnement

Créez un fichier `.env.local` à la racine du projet :

```env
# Identifiants admin - CHANGEZ CES VALEURS !
ADMIN_USERNAME=admin
ADMIN_PASSWORD=votreMotDePasseSecurise123!

# Clé secrète JWT - Générez une clé aléatoire
JWT_SECRET=votre-super-secret-jwt-key-changez-moi

# URL de base (optionnel)
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 3. Lancer le serveur de développement

```bash
npm run dev
```

Le site sera accessible sur [http://localhost:3000](http://localhost:3000)

## 📁 Structure du Projet

```
portfolio/
├── app/
│   ├── page.tsx              # Page d'accueil (portfolio public)
│   ├── layout.tsx            # Layout principal
│   ├── globals.css           # Styles globaux + Tailwind
│   ├── admin/
│   │   ├── page.tsx          # Dashboard admin
│   │   ├── login/page.tsx    # Page de connexion
│   │   ├── profile/page.tsx  # Gestion du profil
│   │   ├── skills/page.tsx   # Gestion des compétences
│   │   ├── projects/page.tsx # Gestion des projets
│   │   ├── experiences/page.tsx
│   │   └── certifications/page.tsx
│   └── api/
│       ├── auth/             # Routes d'authentification
│       └── portfolio/        # API CRUD
├── components/
│   ├── layout/               # Navbar, Footer
│   ├── sections/             # Sections du portfolio
│   ├── admin/                # Composants admin
│   └── ui/                   # Composants réutilisables
├── lib/
│   ├── auth.ts               # Utilitaires d'authentification
│   ├── data.ts               # Gestion des données
│   └── utils.ts              # Utilitaires généraux
├── data/
│   └── portfolio.json        # Données du portfolio
└── middleware.ts             # Protection des routes admin
```

## 🎨 Personnalisation

### Couleurs
Modifiez les couleurs dans `tailwind.config.ts` :

```typescript
colors: {
  primary: '#00d4ff',    // Cyan électrique
  secondary: '#7c3aed',  // Violet
  // ...
}
```

### Contenu
1. Accédez à `/admin/login`
2. Connectez-vous avec vos identifiants
3. Modifiez le contenu via l'interface d'administration

## 🔒 Sécurité

- Les routes `/admin/*` sont protégées par le middleware
- L'authentification utilise des tokens JWT sécurisés
- Les cookies sont HttpOnly et sécurisés en production
- Changez les identifiants par défaut avant le déploiement !

## 📦 Technologies

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Auth**: JWT (jose)
- **TypeScript**: Typage complet

## 🚢 Déploiement

### Vercel (Recommandé)

1. Poussez votre code sur GitHub
2. Connectez le repo à Vercel
3. Configurez les variables d'environnement dans Vercel
4. Déployez !

### Autres plateformes

```bash
npm run build
npm start
```

## 📄 Licence

MIT - Libre d'utilisation pour vos projets personnels et commerciaux.

---

Conçu avec ❤️ pour les passionnés de Cloud, DevOps et IA

# Portfolio
