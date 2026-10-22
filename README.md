# Innovators Hub Music

A full-stack music streaming application built with React.js, Tailwind CSS, and Firebase. The application allows users to explore a curated music collection, search for tracks, save favorites, and manage their music experience through secure authentication and real-time data integration.

**Note:** The current version is optimized for desktop use and is not yet fully responsive.

## Features

- **Music Streaming:** Stream music from a curated collection.
- **Song Search:** Search for songs and explore available tracks.
- **Favorites:** Like and save favorite songs.
- **Authentication:** Secure user authentication using Firebase.
- **Real-Time Database:** Store and manage user data with Cloud Firestore.
- **Deployment:** Application hosting through Firebase Hosting.

## Technology Stack

| Technology | Purpose |
|---|---|
| React.js | Frontend development |
| Tailwind CSS | Styling and interface design |
| Firebase Authentication | User authentication |
| Cloud Firestore | Database and user data management |
| Firebase Hosting | Application deployment |
| Figma | UI/UX design, if applicable |

## Getting Started

Follow the instructions below to set up and run the project locally.

### Prerequisites

Ensure the following are installed on your system:

- Node.js
- npm
- A Firebase account

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/ShivaGurumurthy/Full-Stack-Music-Application.git
```

**2. Navigate to the project directory**

```bash
cd innovators-hub-music
```

Ensure the directory name matches the cloned repository.

**3. Install dependencies**

```bash
npm install
```

**4. Configure Firebase**

- Create a project in the [Firebase Console](https://console.firebase.google.com/).
- Enable Firebase Authentication and configure the required sign-in methods.
- Create a Cloud Firestore database.
- Update `firebase/config.js` with your Firebase project configuration.

Keep sensitive credentials secure and configure appropriate Firestore Security Rules.

**5. Start the development server**

```bash
npm run dev
```

Open the local URL displayed in the terminal to access the application.

## Live Demo

[Innovators Hub Music](http://innovators-hub-music-53079.firebaseapp.com)

## Known Limitations

- **Responsive Design:** The interface is not yet optimized for mobile and tablet devices.
- **Theme Support:** Dark mode and light mode are not currently available.
- **Music Integration:** Tracks are preloaded; no external music API is integrated.

## Future Enhancements

- Implement responsive layouts for mobile, tablet, and desktop.
- Introduce dark and light theme support.
- Integrate a music API for dynamic track discovery.
- Expand playlist creation and management capabilities.
- Improve playback controls and the overall listening experience.

## Contributing

Contributions and suggestions are welcome.

1. Fork the repository.
2. Create a branch for your changes.
3. Implement and commit your changes.
4. Submit a pull request with a clear description of your contribution.

## License

No license has been specified for this project. Add a `LICENSE` file to define the terms under which the software may be used, modified, and distributed.
