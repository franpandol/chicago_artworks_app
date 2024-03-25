// Retrieve Job-defined env vars
const {CLOUD_RUN_TASK_INDEX = 0, CLOUD_RUN_TASK_ATTEMPT = 0} = process.env;
const {scanImages, scanArtworks} = require('./main');

// Define main script
const main = async () => {
  console.log(
    `Starting Task #${CLOUD_RUN_TASK_INDEX}, Attempt #${CLOUD_RUN_TASK_ATTEMPT}...`
  );
    //await scanImages();
    await scanArtworks();
  console.log(`Completed Task #${CLOUD_RUN_TASK_INDEX}.`);
};


// Start script
main().catch(err => {
  console.error(err);
  process.exit(1); // Retry Job Task by exiting the process
});