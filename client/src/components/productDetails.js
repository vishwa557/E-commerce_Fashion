import config from '../config.js';

export const getProductsDetails = () => {
  const serverUrl = config.serverUrl;
  return fetch(`${serverUrl}api/products`, {
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
    return data.products;
    
  })
  .catch(error => {
    console.error('There was a problem fetching the product details:', error);
    throw error;
  });
};
