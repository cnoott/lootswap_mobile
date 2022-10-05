import { API } from '@env';

export const getSignedRequest = (file) => {
    const newName = Math.floor(Math.random() *9999) + encodeURIComponent('test');
    //console.log(newName);
    return fetch(`${API}/sign-s3?file-name=${newName}&file-type=${file.type}`, {
        method: 'GET',
    })
        .then(response => {
            return response.json(); //then call uploadFile in front end
        })
        .catch(err => console.log(err));
};

export const uploadFile = (file, signedRequest, url) => {
    return fetch(signedRequest, {
        method: 'PUT',
        headers: {
            'Content-Type': file.type,
        },
        body: file
    })
        .then(response => {
            if (response.status === 200) {
                return url;
            }
            else {
                return {error: 'Could not return back signed url'};
            }
        })
        .catch(err => console.log(err));
};

