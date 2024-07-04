import { getCurrentUser } from "../helpers/authHelper";
const wypozyczeniaBaseUrl = 'http://localhost:3000/api/wypozyczenia'

export function getWypozyczeniaApiCall(){
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
    const promise = fetch(wypozyczeniaBaseUrl,options)
    return promise;
}

export function getWypozyczenieByIdApiCall(wypId){
    const url = `${wypozyczeniaBaseUrl}/${wypId}`;
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

export function addWypozyczenieApiCall(wyp) {
    const user = getCurrentUser()
    const wypString = JSON.stringify(wyp)
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
        body: wypString
    }
    const promise = fetch(wypozyczeniaBaseUrl, options);
    return promise;
}

export function updateWypozyczenieApiCall(wypId, wyp) {
    const user = getCurrentUser()
    const url = `${wypozyczeniaBaseUrl}/${wypId}`
    const wypString = JSON.stringify(wyp)
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
        body: wypString
    }
    const promise = fetch(url, options);
    return promise;
}

export function deleteWypozyczenieApiCall(wypId) {
    const user = getCurrentUser()
    const url = `${wypozyczeniaBaseUrl}/${wypId}`
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