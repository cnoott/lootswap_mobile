import { API } from '@env';

export const getUser = userId => {
    return fetch(`${API}/user/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'aplication/json',
        }
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err));
};
