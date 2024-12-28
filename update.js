const fs = require('fs');
const axios = require('axios');
const { logo } = require('./hady-zen/log');
const path = require('path');

// Function to check if update is needed
async function cek() {
  const { data } = await axios.get('https://raw.githubusercontent.com/HadyZen/Alya-Kujou/refs/heads/main/package.json');
  
  // Reading the current version from package.json
  const currentVersion = JSON.parse(await fs.promises.readFile('package.json', 'utf8')).version;
  
  // Compare the versions
  if (currentVersion !== data.version) { 
    return 'belum';  // 'belum' means "not yet" (update is required)
  } else {
    return 'udah';  // 'udah' means "already" (no update needed)
  }
}

// Function to update the project
async function update() {
  if (await cek() === 'belum') {
    console.log(logo.info + 'Alya is outdated. Updating now...');

    try {
      // Make sure to download and update the files, but exclude config.json and akun.txt
      const filesToUpdate = ['package.json', 'index.js', 'other_files_you_want_to_update']; // Add other files as needed

      for (const file of filesToUpdate) {
        if (file !== 'config.json' && file !== 'akun.txt') {
          const url = `https://raw.githubusercontent.com/HadyZen/Alya-Kujou/main/${file}`;
          const { data } = await axios.get(url);
          
          // Write the updated file to disk
          await fs.promises.writeFile(path.join(__dirname, file), data);
          console.log(logo.info + `${file} updated successfully.`);
        }
      }
    } catch (error) {
      console.error('Error during update:', error.message);
    }
  } else { 
    console.log(logo.info + 'Alya is already up to date.');
  }
}
