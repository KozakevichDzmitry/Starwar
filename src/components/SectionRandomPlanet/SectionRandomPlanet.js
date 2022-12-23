import React, {Component} from 'react';
import './style.scss'
import api from '../../API'
import imgLoading from '../../img/loading.gif'
import getImg from '../imgLoader/imgLoaer'
import Error from '../error/Error'
import Spinner from '../spinner/Spinner'

export default class SectionRandomPlanet extends Component {
    state = {
        planet:{
            id: null,
            imgSrc: imgLoading,
            name: null,
            population: null,
            rotation: null,
            diameter: null
        },
        isLoading: true,
        isError: false
    }

    componentDidMount() {
        this.updatePlanet()
        this.intervalID = setInterval(()=>this.updatePlanet(), 5000)
    }
    componentWillUnmount() {
        clearInterval(this.intervalID)
    }

    onError(){
        this.setState({isError: true})
    }
    updatePlanet() {
        const planets = api.getAllInstances('planets')
        planets.then((data) => {
            const randomId = Math.floor(Math.random() * (data.count - 1)) + 1
            api.getInstance('planets', randomId)
                .then((data) => {
                    let planet={
                        id: randomId,
                            name: data.name,
                            population: data.population,
                            rotation: data.rotation_period,
                            diameter: data.diameter,
                    }
                    getImg('planets',randomId).then(({imgSrc})=>{
                        planet.imgSrc= imgSrc
                        this.setState({
                            planet,
                            isLoading: false
                        })
                    })
                })
                .catch(this.onError)
        })
    }

    render() {
        const hasContent= !(this.state.isLoading||this.state.isError)
        const spinner = this.state.isLoading? <Spinner/>: null;
        const error = this.state.isError? <Error/>: null;
        const planet = hasContent?  <RandomPlanetContent planet={this.state.planet}/>:null;

        return (
            <section className="random-planet">
                <div className="container">
                    <div className="card card__random-planet">
                        <div className="row g-4">
                            {spinner}
                            {error}
                            {planet}
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

const RandomPlanetContent = ({planet})=>{
    const {name, population, rotation, diameter, imgSrc} = planet
    return(
        <>
            <div className="card__img-wrapper col-lg-4 col-md-6">
                <img src={imgSrc} alt={name}/>
            </div>
            <div className="col-lg-8 col-md-6">
                <div className="card-body card_description">
                    <h3 className="card-title title-random-planet">{name}</h3>
                    <ul className="card__list list-group">
                        <li className="list-group-item">Population {population}</li>
                        <li className="list-group-item">Rotation {rotation}</li>
                        <li className="list-group-item">Diameter {diameter}</li>
                    </ul>
                </div>
            </div>
        </>
    )
}


