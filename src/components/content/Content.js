import React, {Component} from 'react';
import './style.scss'
import api from '../../API'
import TabList from '../tabList/TabList'
import ItemsDetails from "../ItemsDetails/ItemsDetails";
import Row from "../row/Row";
import ErrorBoundary from "../errorBoundary/ErrorBoundry";


export default class Content extends Component {

    state = {
        activePage: this.props.activePage,
        activeInstanceID: null,
        page: 1,
        previousPage: null,
        nextPage: null,
        isLoading: true,
        instances: []
    }

    componentDidMount() {
        this.getInstances(this.state.activePage, this.state.page)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.activePage !== prevProps.activePage) {
            this.setState({
                activePage: this.props.activePage,
                page: 1,
                previousPage: null,
                nextPage: null,
                isLoading: true,
            })
        }
        if (this.state.activePage !== prevState.activePage) {
            this.getInstances(this.props.activePage, this.state.page)
        }
        if (this.state.page !== prevState.page) {
            this.getInstances(this.props.activePage, this.state.page)
        }
    }

    getInstances(activeInstance, page) {
        api.getAllInstances(activeInstance, page)
            .then((res) => {
                this.setState(state => {
                    return {
                        ...state,
                        previousPage: res.previous,
                        nextPage: res.next,
                        activeInstanceID: res.results[0].id,
                        isLoading: false,
                        instances: res.results
                    }
                })
            })
    }

    onSelectInstance(id) {
        this.setState({activeInstanceID: id})
    }

    selectPageNumber(action) {
        this.setState({isLoading: true})
        if (action === 'prev') this.setState((state) => ({page: --state.page||1}))
        else if (action === 'next') this.setState((state) => ({page: ++state.page}))
    }


    render() {
        const items = this.state.instances.reduce((acc, cur) => {
            acc.push({name: cur.name, id: cur.id, active: this.state.activeInstanceID === cur.id})
            return acc
        }, [])
        const tabList = <TabList selectPageNumber={(action) => this.selectPageNumber(action)}
                                 previousPage={this.state.previousPage}
                                 nextPage={this.state.nextPage}
                                 items={items}
                                 isLoading={this.state.isLoading}
                                 onSelect={(id) => this.onSelectInstance(id)}/>

        const itemsDetails = <ItemsDetails activePage={this.state.activePage}
                                           activeInstanceID={this.state.activeInstanceID}/>
        return (
            <main>
                <div className="container">
                    <ErrorBoundary>
                        <Row left={tabList} right={itemsDetails}/>
                    </ErrorBoundary>
                </div>
            </main>
        )
    }
}