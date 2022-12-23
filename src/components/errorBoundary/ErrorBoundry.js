import React, {Component} from 'react'
import Error from "../error/Error";

export default class ErrorBoundary extends Component{
    state={
        hasError: false
    }
    componentDidCatch(error, errorInfo) {
        this.setState({hasError: true})
    }

    render(){
        if(this.state.hasError)return(<Error/>)

        return(
            this.props.children
        )
    }
}