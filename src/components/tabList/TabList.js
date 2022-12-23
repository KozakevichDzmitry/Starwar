import React from 'react'
import './style.scss'
import Spinner from "../spinner/Spinner";

const TabList = ({items, isLoading, onSelect, selectPageNumber,previousPage, nextPage}) => {
    const listItems = isLoading? null: items.map(item => {
        const className = `list-group-item ${item.active ? 'active' : ''}`
        return (
            <li
                key={item.id}
                id={item.id}
                onClick={() => onSelect(item.id)}
                className={className}>
                {item.name}
            </li>)
    })
    const spinner = isLoading ? (<li className="list-group-item"><Spinner/></li>) : null
    return (
        <div className="col-lg">
            <ul className="tabs list-group">
                {spinner}
                {listItems}
            </ul>
            <div className="tabs__pagination">
                <span className={!previousPage && 'disable'} onClick={()=>selectPageNumber('prev')}>Prev</span>
                <span className={!nextPage && 'disable'} onClick={()=>selectPageNumber('next')}>Next</span>
            </div>
        </div>

    )
}
export default TabList
