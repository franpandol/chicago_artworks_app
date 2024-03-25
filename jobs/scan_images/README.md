
# Artist Image Updater

This Node.js application automates the process of updating artist records in Firestore with compressed images fetched from Wikipedia. It leverages Google Cloud Platform services, including Firestore for database management and Google Cloud Storage for optimized image hosting. Designed to run as a job on Google Cloud Run, it executes at configured intervals or in response to specific events.

## Project Structure

```
/project-root
  /src
    /firestore
      - db.js          # Handles Firestore database operations
    /storage
      - storage.js     # Manages Google Cloud Storage operations
    /wiki
      - wiki.js        # Fetches images from Wikipedia
  - index.js           # Main application script
  - package.json       # Node.js dependencies and scripts
  - README.md          # Documentation
```

## Features

- **Firestore Integration**: Retrieves and updates artist works.
- **Wikipedia Image Fetching**: Sources images related to artists via the Wikipedia API.
- **Image Compression**: Compresses images for efficient storage.
- **Cloud Storage**: Stores images in a Google Cloud Storage bucket and updates Firestore with URLs.

## Setup and Deployment

### Prerequisites

- Node.js and npm.
- A Google Cloud Platform account.
- A Firestore database and a Google Cloud Storage bucket within your GCP project.

### Local Setup

1. Clone the repository.
2. Install dependencies with `npm install`.
3. Configure environment variables for your GCP project ID, Firestore database, and Storage bucket.

### Running Locally

Ensure you have Google Cloud credentials configured on your machine. Run the application with:

```
node index.js
```

### Deployment as a Cloud Run Job

1. **Containerize Your Application**:
   - Create a `Dockerfile` in your project root:

     ```Dockerfile
     # Use the official lightweight Node.js 14 image.
     # https://hub.docker.com/_/node
     FROM node:14-slim

     # Create and change to the app directory.
     WORKDIR /usr/src/app

     # Copy application dependency manifests to the container image.
     # A wildcard is used to ensure both package.json AND package-lock.json are copied.
     # Copying this separately prevents re-running npm install on every code change.
     COPY package*.json ./

     # Install production dependencies.
     RUN npm install --only=production

     # Copy local code to the container image.
     COPY . ./

     # Run the web service on container startup.
     CMD [ "node", "index.js" ]
     ```

   - Build your container image using Cloud Build:

     ```
     gcloud builds submit --tag gcr.io/your-project-id/artist-updater
     ```

2. **Deploy the Container as a Cloud Run Job**:
   - Navigate to the Cloud Run section of the Google Cloud Console.
   - Click "Create Job" and select the container image you just built (`gcr.io/your-project-id/artist-updater`).
   - Configure the job's settings according to your requirements (e.g., memory allocation, triggered events).
   - Deploy the job.

3. **Deploy as a source code on Cloud Run**
    - Navigate to the Cloud Run section of the Google Cloud Console.
    - Click "Create Service" and select "Deploy one revision from an existing repository".
    - Select your repository and branch.
    - Configure the job's settings according to your requirements (e.g., memory allocation, triggered events).
    - Deploy the job.
4. **Deploy source code using cli**
    - Run the following command to deploy the source code to Cloud Run
    ```
    gcloud run jobs deploy compress-images  --source . --region us-east1
    ```

### Triggering the Job

- **Schedule**: Use Cloud Scheduler to invoke the Cloud Run job at regular intervals.
- **Event-driven**: Configure Pub/Sub or another event-driven mechanism to trigger the job in response to specific events.
- **Using the cli**: Use the following command to trigger the job
    ```
    gcloud run jobs execute compress-images
    ```
## Maintenance and Monitoring

- **Logging and Monitoring**: Utilize Google Cloud's operations suite for in-depth monitoring and logging of your job's execution.
- **Dependencies**: Regularly update your Node.js dependencies to ensure compatibility with Google Cloud services.

## Security Considerations

- Secure your Firestore database and Cloud Storage with appropriate IAM roles and permissions.
- Avoid committing sensitive information, like service account keys, to version control.

## Contributing