const apiUrl = 'http://localhost:5000/api';

export const getProductsDetails = () => {
  return fetch(`${apiUrl}/products`, {
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
