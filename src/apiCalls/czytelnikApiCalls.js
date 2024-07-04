import { getCurrentUser } from "../helpers/authHelper";
const czytelnicyBaseUrl = 'http://localhost:3000/api/czytelnicy'

export function getCzytelniksApiCall(){
    const user = getCurrentUser()
    let token
    if(user && user.token){
        token=user.token
    }
    const options = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }
    const promise = fetch(czytelnicyBaseUrl, options);
    return promise;
}

export function getCzytelnikByIdApiCall(czytId){
    const url = `${czytelnicyBaseUrl}/${czytId}`;
    const user = getCurrentUser()
    let token
    if(user && user.token){
        token=user.token
    }
    const options = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }
    const promise = fetch(url, options);
    return promise;
}

export function addCzytelnikApiCall(czyt) {
    const user = getCurrentUser()
    const czytString = JSON.stringify(czyt)
    let token
    if(user && user.token){
        token=user.token
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: czytString
    }
    const promise = fetch(czytelnicyBaseUrl, options);
    return promise;
}

export function updateCzytelnikApiCall(czytId, czyt) {
    const user = getCurrentUser()
    const url = `${czytelnicyBaseUrl}/${czytId}`
    const czytString = JSON.stringify(czyt)
    let token
    if(user && user.token){
        token=user.token
    }
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: czytString
    }
    const promise = fetch(url, options);
    return promise;
}

export function deleteCzytelnikApiCall(czytId) {
    const user = getCurrentUser()
    const url = `${czytelnicyBaseUrl}/${czytId}`
    let token
    if(user && user.token){
        token=user.token
    }
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }
    const promise = fetch(url, options);
    return promise;
}