<!-- project philosophy -->
<img src="./readme/demo/title2.svg"/>

> A multi platform service, that helps developers and recruiters meet their most suited companion easier.
>
> DevSwipe.
### User Stories
- As a user, I want to view opposite type users, so i can potentially find a person i am interested in.
- As a user, I want to swipe on a user, so i can match with them.
- As a user, I want to upload images, so viewers can make a well informed decision.
- As a user, I want to view my matches, so i can stay up to date on my contacts list.
- As a user, I want to update my skills, so i can grab potential recruiter's attention.

### Admin Stories
- As an admin, I want to view available users, so i can check their profiles.
- As an admin, I want to view analytics, so i can stay up to date.
- As an admin, I want to manage my users, so i can block or unblock them.
- As an admin, I want to view system skills, so i can edit, remove or add to them.

<br><br>

<!-- Prototyping -->
<img src="./readme/demo/title3.svg"/>

> We created three seperate platforms, each with a goal in mind.
> The website's intended use is for the users to register and manage their profiles, as well as stay up to date on their analytics.
> The Desk app's intended use is for the admin to be able to maintain their user base, as well as check up on their data.
> The mobile app's intended use is for the users to be able to interact with each other, swiping, viewing picks and getting background information about them.

<!-- Implementation -->
<img src="./readme/demo/title4.svg"/>

> Using the wireframes and mockups as a guide, we implemented the DevSwipe app with the following features:
### User Screens (Mobile)
| Login screen  | Landing screen | Profile |
| ---| ---| ---|
| ![Landing](./readme/demo/mobile/login-mobile.png) | ![fsdaf](./readme/demo/mobile/dashboard-mpbile.png) | ![fsdaf](./readme/demo/mobile/profile-mobile.png) |

### Mobile interactions
| Login screen  | Dashboard screen |  Profile screen |
| ---| ---| ---|
| ![Landing](./readme/demo/mobile/mobile-gif/login-mobile.gif) | ![fsdaf](./readme/demo/mobile/mobile-gif/swipe-mobile.gif) | ![fsdaf](./readme/demo/mobile/mobile-gif/mobile-profile-carousel.gif) |
| Edit skills screen  | Edit Details Screen
| ---| ---| ---|
| ![fsdaf](./readme/demo/mobile/mobile-gif/mobile-edit1.gif) | ![fsdaf](./readme/demo/mobile/mobile-gif/mobile-edit2.gif)

### User Screens (Web)
| Login screen  | Register screen 
| ---| ---|
| ![Landing](./readme/demo/website/login-web.png) | ![fsdaf](./readme/demo/website/register-desk.png) 
|  Dashboard screen | Profile Screen 
| ![fsdaf](./readme/demo/website/dashboard-desk.png) |![fsdaf](./readme/demo/website/profile-desk.png) |
|  Update User Details | Upload Image Screen 
|  ![fsdaf](./readme/demo/website/model-edit-desk.png) | ![fsdaf](./readme/demo/website/model-upload1-desk.png)
| Upload CV
![fsdaf](./readme/demo/website/model-upload2-desk.png)

### Website interactions
| Register screen  | Profile screen 
| ---| ---|
| ![Landing](./readme/demo/website/web-gif/web-login.gif) | ![fsdaf](./readme/demo/website/web-gif/web-upload.gif) 
| Profile interactions screen |  Profile-Edit screen |
| ---| --|
| ![fsdaf](./readme/demo/website/web-gif/web-carousel.gif) | ![fsdaf](./readme/demo/website/web-gif/web-profile-update.gif) |


### Admin Screens (Desk)
| Login screen  | Dashboard screen |  Stats screen |
| ---| ---| ---|
| ![Landing](./readme/demo/desktop/login-desk.png) | ![fsdaf](./readme/demo/desktop/dashboard-desk1.png) | ![fsdaf](./readme/demo/desktop/stats-desk.png) |
| Developers screen  | Developers Profile Screen | Skills Screen 
| ![Landing](./readme/demo/desktop/developers-desk.png) | ![fsdaf](./readme/demo/desktop/profile-desk2.png) | ![fsdaf](./readme/demo/desktop/skills.png) 
| Skills Modal One | Skills Modal Two |
| ![fsdaf](./readme/demo/desktop/skills-modal1.png) |![fsdaf](./readme/demo/desktop/skills-modal2.png)

### Admin interactions
| Login-Dashboard screen  | Stats screen 
| ---| ---|
| ![Landing](./readme/demo/desktop/admin-gif/desk-login.gif) | ![Landing](./readme/demo/desktop/admin-gif/desk-stats.gif) 
| Users screen |  Profile screen |
| ---| ---|
| ![fsdaf](./readme/demo/desktop/admin-gif/desk-users.gif) | ![fsdaf](./readme/demo/desktop/admin-gif/desk-profile.gif) |

<br><br>

<!-- Tech stack -->
<img src="./readme/demo/title5.svg"/>

###  DevSwipe is built using the following technologies:

- This project uses the [React-Native app development framework](https://flutter.dev/). React Native is a JavaScript framework for writing real, natively rendering mobile applications for iOS and Android.
- This project uses the [React app development framework](https://flutter.dev/). React is a free and open-source front-end JavaScript library for building user interfaces based on components, it can be used to develop single-page, mobile, or server-rendered applications with frameworks like Next.js.
- This project uses the [Electron app development framework](https://flutter.dev/). Electron is a free and open-source software framework that is designed to create desktop applications using web technologies that are rendered using a version of the Chromium browser engine and a back end using the Node.js runtime environment.

<br><br>

<!-- How to run -->
<img src="./readme/demo/title6.svg"/>

> To set up DevSwipe locally, follow these steps:
>
Postman

This is a JSON file for the postman APIs collection for this project HemaConnect.postman_collection.json and it is hosted on the IP Address "3.253.104.27". You can change the address of the APIs to test them online with postman.

### Prerequisites

Mentioned bellow is the list of dependancies you'll need to use to run the project on your device.

* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

  This project is divided into 4 Projects, with the first being a laravel project as a back-end for the remaining 3 projects.
  To run laravel, you will first have to 
  
1. Clone the repo
   ```sh
   git clone https://github.com/Majed-Habli/DevVibe.git
   ```
2. Navigate to
   ```sh
   cd DevVibe/Back-End-Laravel/Server-DevVibe
   ```
4. Run composer install
   ```sh
   composer install
   ```
5. Initialize the database
   ```sh
   php artisan migrate
   ```
6. Serve to start the server
   ```sh
   php artisan serve
   ```
Project number 2 is a website developed using React. To run the React project (assuming you've already cloned the repo), you will need to 
  
1. Navigate to
   ```sh
   cd DevVibe/Front-End-Website/dev-swipe-web
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
4. Start the client
   ```sh
   npm start
   ```

Project number 3 is a desktop app developed using Electron.js framework and React for the user interface. To run the project (assuming you've already cloned the repo), you will need to 

1. Navigate to
   ```sh
   cd DevVibe/Front-end-Desktop/dev-swipe-desktop
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Start the client
   ```sh
   npm run start
   ```
   
4. Navigate to
   ```sh
   cd DevVibe/Front-end-Desktop/
   ```
5. Install NPM packages
   ```sh
   npm install
   ```
6. Start the client
   ```sh
   npm run dev:watch
   ```

Project number 4 is a Mobile app developed using React-Native. To run the project (assuming you've already cloned the repo), you will need to 

1. Navigate to
   ```sh
   cd DevVibe/Front-End-Mobile/dev-swipe-mobile
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Install Expo to run on mobile
   > [Android Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

   > [Apple Store](https://apps.apple.com/us/app/expo-go/id982107779)
   
3. Start the client
   ```sh
   expo start
   ```

Now, you should be able to run DevSwipe locally and explore its features.
