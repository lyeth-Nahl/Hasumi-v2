const axios = require('axios');
const apiUrl = 'https://rangestudio.wuaze.com/endpoint/user_api.php'; 

async function getUserData(realId) {
  try {
    const response = await axios.get(apiUrl, {
      params: { real_id: realId },
    });
    return response.data;
  } catch (error) {
    console.error('Error getting user data:', error.message);
  }
}

async function createUserData(realId) {
  try {
    const response = await axios.get(apiUrl, {
      params: { real_id: realId },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating user data:', error.message);
  }
}

module.exports = { getUserData, createUserData };
