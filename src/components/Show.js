//================Imports================//
import React from 'react'

//================Imports================//
const Show = (props) => {

//================Return================
    return (
        <div>
            <h3>{props.prop.title}</h3>
            <p>Made by: {props.prop.author}</p>
            <img src={props.prop.image} />
            <details>
                <summary>Show Details</summary>
                <ul>
                    <li>Category: {props.prop.category}</li>
                    <li>Location: {props.prop.location}</li>
                    <li>Description: {props.prop.description}</li>
                    <li>Price: {props.prop.price}</li>
                    <li>Rating: {props.prop.rating}</li>
                </ul>
            </details>
        </div>
    )
}

//================Export================//
export default Show
