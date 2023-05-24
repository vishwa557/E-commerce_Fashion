import React, { useState, useEffect } from 'react';
import '../styles/profile.css';
import config from '../config.js';

function ProfilePage() {
  const [userDetails, setUserDetails] = useState(null);
  const [addresses, setAddresses] = useState([]);

  const [error, setError] = useState(null);
  const [addressFormVisible, setAddressFormVisible] = useState(false);
  const [newAddress, setNewAddress] = useState({
    street: '',
    houseNumber: '',
    city: '',
    state: '',
    country: '',
    zipCode: ''
  });
  const serverUrl = config.serverUrl;
  // console.log(newAddress);
  useEffect(() => {
    fetch(`${serverUrl}api/get_user`, {
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
        setUserDetails(data.user);
      })
      .catch(error => {
        console.error('There was a problem fetching the user details:', error);
        setError(error);
      });

    fetch(`${serverUrl}api/get_address`, {
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
        setAddresses(data.addresses);
      })
      .catch(error => {
        console.error('There was a problem fetching the addresses:', error);
        setError(error);
      });
  }, []);

  const handleNewAddressChange = e => {
    setNewAddress({
      ...newAddress,
      [e.target.name]: e.target.value
    });
  };

  const handleNewAddressSubmit = e => {
    e.preventDefault();
    fetch(`${serverUrl}api/new_address`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newAddress)
    })
      .then(response => {
        if (response.ok) {
          setAddressFormVisible(false);
          setNewAddress({
            street: '',
            houseNumber: '',
            city: '',
            state: '',
            country: '',
            zipCode: ''
          });
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(data => {
        setAddresses([...addresses, data.address]);
      })
      .catch(error => {
        console.error('There was a problem adding the new address:', error);
        setError(error);
      });
  };


  const handleShowFormClick = () => {
    setAddressFormVisible(true);
  };

  const handleHideFormClick = () => {
    setAddressFormVisible(false);
  };

  return (
    <div>
      {error && <p>There was a problem fetching the user details.</p>}
      {userDetails && (
        <>
          <div class="user-card">
            <div class="user-details">
              <p class="user-name">{userDetails.firstname} {userDetails.lastname}</p>
              <p class="user-email">{userDetails.email}</p>
              <p class="user-phone">{userDetails.phone}</p>
            </div>
          </div>

          <table class="address-table">
            <thead>
              <tr>
                <th class="address-table__header">Street</th>
                <th class="address-table__header">House Number</th>
                <th class="address-table__header">City</th>
                <th class="address-table__header">State</th>
                <th class="address-table__header">Country</th>
                <th class="address-table__header">ZIP Code</th>
              </tr>
            </thead>
            <tbody>
              {addresses.map(address => (
                <tr key={address._id} class="address-table__row">
                  <td class="address-table__data">{address.street}</td>
                  <td class="address-table__data">{address.houseNumber}</td>
                  <td class="address-table__data">{address.city}</td>
                  <td class="address-table__data">{address.state}</td>
                  <td class="address-table__data">{address.country}</td>
                  <td class="address-table__data">{address.zipCode}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <button onClick={handleShowFormClick}>Add New Address</button>
          {addressFormVisible && (
           <form class="address-form" onSubmit={handleNewAddressSubmit}>
           <div class="form__group--left">
             <label class="address-form__label">
               Street:
               <input class="address-form__input" type="text" name="street" value={newAddress.street} onChange={handleNewAddressChange} />
             </label>
             <label class="address-form__label">
               House number:
               <input class="address-form__input" type="text" name="houseNumber" value={newAddress.houseNumber} onChange={handleNewAddressChange} />
             </label>
             <label class="address-form__label">
               City:
               <input class="address-form__input" type="text" name="city" value={newAddress.city} onChange={handleNewAddressChange} />
             </label>
           </div>
         
           <div class="form__group--right">
             <label class="address-form__label">
               State:
               <input class="address-form__input" type="text" name="state" value={newAddress.state} onChange={handleNewAddressChange} />
             </label>
             <label class="address-form__label">
               Country:
               <input class="address-form__input" type="text" name="country" value={newAddress.country} onChange={handleNewAddressChange} />
             </label>
             <label class="address-form__label">
               ZIP code:
               <input class="address-form__input" type="text" name="zipCode" value={newAddress.zipCode} onChange={handleNewAddressChange} />
             </label>
           </div>
         
           <div class="form__group--center">
             <button class="address-form__button" type="submit">Add Address</button>
             <button class="address-form__button" type="button" onClick={handleHideFormClick}>Cancel</button>
           </div>
         </form>         

          )}
        </>
      )}
    </div>
  );
}

export default ProfilePage;  
