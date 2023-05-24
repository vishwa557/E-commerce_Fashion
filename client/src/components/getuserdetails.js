import config from '../config.js';

export const getUserDetails = () => {
  const serverUrl = config.serverUrl;
  return fetch(`${serverUrl}api/get_user`, {
    method: 'GET',
    credentials: 'include',
  })
  .then(response => {
    if (response.ok) {
      return response.json();
      
    }
    throw new Error('Network response was not ok.');
  })
  .then(data => {
    return data.user;
    
  })
  .catch(error => {
    console.error('There was a problem fetching the user details:', error);
    throw error;
  });
};
