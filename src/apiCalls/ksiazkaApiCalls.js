import { getCurrentUser } from "../helpers/authHelper";
const ksiazkiBaseUrl = 'http://localhost:3000/api/ksiazki'

export function getKsiazkiApiCall(){
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
    const promise = fetch(ksiazkiBaseUrl,options)
    return promise;
}

export function getKsiazkaByIdApiCall(ksiId){
    const url = `${ksiazkiBaseUrl}/${ksiId}`;
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
    const promise = fetch(url,options);
    return promise;
}

export function addKsiazkaApiCall(ksi) {
    const user = getCurrentUser()
    const ksiString = JSON.stringify(ksi)
    let token
    if(user && user.token){
        token=user.token
    }
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer' + token
        },
        body: ksiString
    }
    const promise = fetch(ksiazkiBaseUrl, options);
    return promise;
}

export function updateKsiazkaApiCall(ksiId, ksi) {
    const user = getCurrentUser()
    const url = `${ksiazkiBaseUrl}/${ksiId}`
    const ksiString = JSON.stringify(ksi)
    let token
    if(user && user.token){
        token=user.token
    }
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer' + token
        },
        body: ksiString
    }
    const promise = fetch(url, options);
    return promise;
}

export function deleteKsiazkaApiCall(ksiId) {
    const user = getCurrentUser()
    const url = `${ksiazkiBaseUrl}/${ksiId}`
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