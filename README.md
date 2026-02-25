# 🏗️ TaskRux — Construction Management Mobile App

> Empowering construction companies with smarter communication, streamlined operations, and faster project delivery — all from a single mobile platform.

---

## 📱 About TaskRux

TaskRux is a mobile application built for construction companies to modernize how they manage their sites, teams, and day-to-day operations. Whether you're a general contractor, civil engineer, or site supervisor, SiteOps gives you the tools to stay organized and in control — on the ground or on the go.

### Key Features

- **Company Onboarding** — Set up your company profile, legal details, and headquarters location in minutes
- **Team Management** — Invite crew members, assign roles, and manage permissions across your organization
- **Site Operations** — Create and monitor multiple construction sites with real-time progress tracking
- **Role-Based Access** — Fine-grained roles including Supervisor, Project Manager, Worker, and Viewer to keep data secure and relevant
- **Task Management** — Assign, track, and complete tasks tied to specific sites and workers
- **Daily Reports** — Workers can log daily progress; supervisors can review and approve site reports
- **Communication** — Built-in team messaging to reduce reliance on scattered WhatsApp groups and emails
- **Document Management** — Store and access site documents, licenses, and compliance records in one place
- **Localized Compliance** — Location-based compliance settings tailored to your region

---

## 🛠️ Tech Stack

- **Framework** — [React Native](https://reactnative.dev/) via [Expo](https://expo.dev/)
- **Navigation** — [Expo Router](https://expo.github.io/router/)
- **Language** — TypeScript
- **Icons** — [Phosphor React Native](https://phosphoricons.com/)
- **Linting** — ESLint + Prettier

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Expo Go](https://expo.dev/client) app on your physical device (optional)
- Android Studio or Xcode for emulator (optional)

---

### 🍴 Forking the Repository

1. Navigate to the repository on GitHub
2. Click the **Fork** button in the top-right corner
3. Select your GitHub account as the destination
4. Once forked, clone your copy locally:

```bash
git clone https://github.com/SAM-K3YZ/TaskRux.git
cd TaskRux
```

---

### 📦 Installing Dependencies

After cloning, install all required packages:

```bash
npm install
```

Or if you prefer yarn:

```bash
yarn install
```

---

### ▶️ Running the App

Start the Expo development server:

```bash
npx expo start
```

Then choose how to run it:

- Press `a` to open on Android emulator
- Press `i` to open on iOS simulator
- Scan the QR code with **Expo Go** on your physical device

---

### 🧹 Linting & Formatting

To check for lint errors:

```bash
npx eslint .
```

To auto-fix formatting:

```bash
npx prettier --write .
```

---

## 📁 Project Structure

```
Frontend/
├── app/                  # Expo Router screens
│   ├── (auth)/           # Authentication & onboarding screens
│   └── (tabs)/           # Main app tab screens
├── components/           # Reusable UI components
├── constants/            # Theme, colors, spacing
├── types/                # TypeScript interfaces & types
├── utils/                # Helper functions (scaling, formatting)
└── assets/               # Images, fonts, icons
```

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit: `git commit -m "feat: add your feature"`
4. Push to your fork: `git push origin feature/your-feature-name`
5. Open a **Pull Request** against the `main` branch

Please make sure your code passes linting before submitting a PR.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 📬 Contact

Have questions or suggestions? Reach out via the Issues tab or contact the maintainer directly through GitHub.

---

> Built with 💖 from Exypnos Design to the people who build the world.


