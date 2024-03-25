
# Express Artworks API with Firestore Integration and frontend with React

This project is created to practice React and Node.js and experiment new features and to be the base for blog posts. 

The project is a full-stack application that includes a Node.js backend and a Firestore database. The backend serves as an API for fetching artist and artwork data from Firestore, while the frontend is a React application that consumes this data and displays it to the user.


## Features

- **Firestore Database Integration**: Utilizes Google Cloud Firestore to store and retrieve artist and artwork data.
- **Express.js Framework**: Leverages Express.js for easy API endpoint creation and server setup.
- **Security with Helmet**: Adds various security headers to protect the app from web vulnerabilities.
- **Compression**: Compresses response bodies to reduce the size of the response data.
- **CORS Enabled**: Allows cross-origin requests from the frontend application.
- **Morgan Logging**: Provides HTTP request logging.
- **Centralized Error Handling**: Implements a middleware for handling errors globally.

## Setup

### Prerequisites

- Node.js and npm installed.
- A Firebase project with Firestore enabled.
- Firebase Admin SDK set up and initialized in your project.

### Installation

1. Clone the repository to your local machine.

2. Navigate to the project directory and install the required dependencies:

   ```sh
   npm install
   ```

Running the Application

To start the application, run:
   ```sh
   npm start
   ```


This will start the server on the defined PORT, defaulting to 8000 if not specified in the environment variables.
### API Endpoints

**GET /api/artists**: Fetches a list of artists from Firestore.
**GET /api/artworks**: Fetches a list of artworks from Firestore.
**GET /api/artworks/:id**: Fetches details for a specific artwork by ID from Firestore.
    
Additional endpoints can be added by defining new routes in the respective modules.

## Middleware Integration

**CORS**: Allows requests from different origins for a frontend application to communicate with the backend.
**Helmet**: Enhances security by setting various HTTP headers.
**Compression**: Reduces the size of the response body, improving the speed of web applications.
**Morgan**: Logs incoming requests, aiding in debugging and monitoring.

## Deployment

For deploying the application to a production environment, we are using Google Cloud Run. The following steps outline the deployment process:

1. **Set environment variables**: Configure the necessary environment variables for your production environment, such as the Firestore credentials and the server IP.
2. **Build the frontend**: Build the frontend application using the appropriate build command. For example, with a React application, you can run `npm run build`.
3. **Deploy to GCP as a service**: Deploy the application to Google Cloud Run using the `gcloud` CLI or the Google Cloud Console.
  ```
  gcloud run deploy chicago-service --source .
  ```   
4. **Access the deployed service**: Once the deployment is complete, you can access the service using the provided URL.



How is our infra now

The express app is an api that serves the data of the artists and artworks from firestore
The frontend is a react app that consumes the data from the express app

we have a node js using express app deployed to google cloud run , inside this node app we have a connection to firestore to get the data of the artists and artworks

we have a frontend app using react and built using vite that is served by the node app


