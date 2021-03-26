export function getCitations() {
    const data = localStorage.getItem('data');
    return data ? JSON.parse(data) : [];
}
export function saveCitations(value) {
    localStorage.setItem('data', JSON.stringify(value));
    Citations = value;
}
let Citations = getCitations();
export default Citations;
export function save() {
    saveCitations(Citations);
}
