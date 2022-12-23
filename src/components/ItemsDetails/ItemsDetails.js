import React, {Component} from 'react'
import api from "../../API";
import getImg from "../imgLoader/imgLoaer";
import Spinner from '../spinner/Spinner'
import './style.scss'
import ErrorBoundary from "../errorBoundary/ErrorBoundry";

export default class ItemsDetails extends Component {
    state = {
        activeInstanceID: this.props.activeInstanceID,
        activePage: this.props.activePage,
        isLoading: true,
        data: {}
    }

    componentDidMount() {
        this.getInstance(this.state.activePage, this.state.activeInstanceID)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.activePage !== prevProps.activePage || this.props.activeInstanceID !== prevProps.activeInstanceID){
            this.getInstance(this.props.activePage, this.props.activeInstanceID)
        }
    }

    getInstance(activeInstance, id) {
        if (!id) return null
        this.setState({
            isLoading: true,
        })
        api.getInstance(activeInstance, id)
            .then((res) => {
                if(activeInstance==='people') activeInstance = 'characters'
                getImg(activeInstance, res.id).then(({imgSrc}) => {
                    res.imgSrc = imgSrc
                    this.setState({
                        data: res,
                        isLoading: false,
                    })
                })
            })
    }

    render() {
        const spinner = this.state.isLoading ? <Spinner/> : null;
        const details = !this.state.isLoading ?
            <Details data={this.state.data}/> : null;
        return (
            <div className="block-info col-lg">
                <div className="card card__details">
                    <div className="row g-1">
                        {spinner}
                        {details}
                    </div>
                </div>
            </div>
        )
    }
}
const Details = ({data}) => {
    const {name, imgSrc, ...details} = data
    const Field = (props) => {
        return (React.Children.map(Object.keys(props.children), key => {
            const excludeKey =['id', 'url', 'films', 'residents', 'created','edited', 'homeworld', 'vehicles', 'starships', 'species']
            if(excludeKey.includes(key)) return null
            return (<li className="list-group-item">{key}: {props.children[key]}</li>)
        }))
    }
    return (
        <>
            <div className="card__img-wrapper col-md-4">
                <img src={imgSrc} className="min-img img-fluid rounded-start" alt={name}/>
            </div>
            <div className="col-md-8">
                <div className="card-body">
                    <h3 className="card-title">{name}</h3>
                    <ul className="card__list list-group p-l">
                        <ErrorBoundary>
                            <Field>{details}</Field>
                        </ErrorBoundary>
                    </ul>
                </div>
            </div>
        </>
    )
}

