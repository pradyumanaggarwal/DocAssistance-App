import { API } from "../../backend";

export const getAllCitizens = () => {
  return fetch(`${API}/citizens`, { method: "GET" })
    .then(response => {
     
      return response.json();
    })
    .catch(err => console.log(err));
};

export const getAllPatients = (userId) => {
  return fetch(`${API}/patient/${userId}`, { method: "GET" })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const getUser = (userId,token) => {
  return fetch(`${API}/user/${userId}`,{
    method : "GET",
    headers : {
      Authorization: `Bearer ${token}`
    }
  })
  .then(response => {
    //console.log(response.json);
    return response.json();
  })
  .catch(err => console.log(err));
}

// export const createCategory = (userId, token, category) => {
//   return fetch(`${API}/category/create/${userId}`, {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`
//     },
//     body: JSON.stringify(category)
//   })
//     .then(response => {
//       return response.json();
//     })
//     .catch(err => console.log(err));
// };