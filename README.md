
# Chicago Artworks API with Firestore, React and Express

This project is created to practice React and Node.js and experiment new features and to be the base for blog posts. 

It's full-stack application that includes a Node.js Express backend and a Firestore database. The backend serves as an API for fetching artist and artwork data from Firestore, while the frontend is a React application that consumes this data and displays it to the user.
The app also includes a folder named jobs that contains a script that runs every 24 hours to fetch the data from the Art Institute of Chicago API and store it in Firestore. It also has a script to scan the images from wikipedia, compress and store them in a Bucket in Google Cloud Storage.

The deployment of the app was planned to be done in Google Cloud. To do this we build the frontend app using Vite and the backend app using Express.js. The backend app is deployed to Google Cloud Run. We use Google Cloud Storage to store the images and Google Cloud Firestore to store the data of the artists and artworks.


## Features
- [**Firestore Database Integration**](https://firebase.google.com/docs/firestore): Utilizes Google Cloud Firestore to store and retrieve artist and artwork data.
- [**Express.js Framework**](https://expressjs.com/): Leverages Express.js for easy API endpoint creation and server setup.
- [**Security with Helmet**](https://helmetjs.github.io/): Adds various security headers to protect the app from web vulnerabilities.
- [**Compression**](https://github.com/expressjs/compression): Compresses response bodies to reduce the size of the response data.
- [**CORS Enabled**](https://github.com/expressjs/cors): Allows cross-origin requests from the frontend application.
- [**Morgan Logging**](https://github.com/expressjs/morgan): Provides HTTP request logging.
- [**Centralized Error Handling**](https://expressjs.com/en/guide/error-handling.html): Implements a middleware for handling errors globally.

## Setup

### Prerequisites

- Node.js and npm installed.
- A Google Cloud project with Firestore enabled.

Running the Application

To start the application, run:
   ```sh
   make run
   ```


This will start the server on the defined PORT, defaulting to 8000 if not specified in the environment variables.
### API Endpoints

- **GET /api/artists**: Fetches a list of artists from Firestore.
- **GET /api/artworks**: Fetches a list of artworks from Firestore.
- **GET /api/artworks/:id**: Fetches details for a specific artwork by ID from Firestore.
    
Additional endpoints can be added by defining new routes in the respective modules.

## Deployment

For deploying the application to a production environment, we are using Google Cloud Run. The following steps outline the deployment process:

1. **Set environment variables**: Configure the necessary environment variables for your production environment, such as the Firestore credentials and the server IP.
2. **Build the frontend**: Build the frontend application using the appropriate build command. 
  ```
  make build
  ```
3. **Deploy to GCP as a service**: Deploy the application to Google Cloud Run using the `gcloud` CLI or the Google Cloud Console.
  ```
  gcloud run deploy chicago-service --source .
  ```   
4. **Access the deployed service**: Once the deployment is complete, you can access the service using the provided URL.


