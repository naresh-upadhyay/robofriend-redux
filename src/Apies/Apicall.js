export const Apicall = (link)=>{
    return fetch(link).then(response => response.json());
}