const getImg = async (instance, id)=> {
    return fetch(`https://starwars-visualguide.com/assets/img/${instance}/${id}.jpg`)
        .then((res) => {
            if (res.ok) return {imgSrc: `https://starwars-visualguide.com/assets/img/${instance}/${id}.jpg`}
            else return{imgSrc: `https://starwars-visualguide.com/assets/img/big-placeholder.jpg`}
        })
}
export default getImg