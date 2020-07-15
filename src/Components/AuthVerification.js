export const getToken = (() => {
    const admin = localStorage.getItem('a');
    const token = localStorage.getItem('t');
    const person_name = localStorage.getItem('n');
    return {
        admin: admin,
        token_access: token,
        person_name: person_name
    }
})()

export function addToken(token, admin, name){
    localStorage.setItem('a', admin);
    localStorage.setItem('t', token);
    localStorage.setItem('n', name);
}

export function removeToken(){
    localStorage.removeItem('a');
    localStorage.removeItem('t')
    localStorage.removeItem('n');
}