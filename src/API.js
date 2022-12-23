class API {
    _urlAPI = 'https://swapi.dev/api'

    getAllInstances(instance, page=1) {
        return fetch(`${this._urlAPI}/${instance}/?page=${page}`)
            .then(response => {
                if (!response.ok) throw new Error('Ответ сети был не ok.');
                return response.json()
            })
            .then(data =>{
                data.results.map(item=> item.id=this._getId(item.url))
                return data
            })
    }

    getInstance(instance, id) {
        return fetch(`${this._urlAPI}/${instance}/${id}`)
            .then(response => {
                if (!response.ok) throw new Error('Ответ сети был не ok.');
                return response.json()
            })
            .then(data => {
                return {
                    id:this._getId(data.url),
                    ...data
                }
            })
    }
    _getId(url){
        const arr =url.split('/')
        return arr[arr.length-2]
    }
}
const api = new API()
export default api
