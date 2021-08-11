//================Imports================//
import React from 'react'

//================Imports================//
const Show = (props) => {

//================Return================
    return (
        <div>
            <h3 class="title-prop">{props.prop.title}</h3>
            <p>Made by: {props.prop.author}</p>
            <img class="img-prop" src={props.prop.image} />
            <details>
                <summary>Show Details</summary>
                <ul>
                    <li>Category: {props.prop.category}</li>
                    <li>Location: {props.prop.location}</li>
                    <li>Description: {props.prop.description}</li>
                    <li>Price: {props.prop.price}</li>
                    { props.prop.rating === "1" &&
                    <li>Rating: &#x2B50;</li>
                    }
                    { props.prop.rating === "2" &&
                    <li>Rating: &#x2B50;&#x2B50;</li>
                    }
                    { props.prop.rating === "3" &&
                    <li>Rating: &#x2B50;&#x2B50;&#x2B50;</li>
                    }
                    { props.prop.rating === "4" &&
                    <li>Rating: &#x2B50;&#x2B50;&#x2B50;&#x2B50;</li>
                    }
                    { props.prop.rating === "5" &&
                    <li>Rating: &#x2B50;&#x2B50;&#x2B50;&#x2B50;&#x2B50;</li>
                    }
                </ul>
            </details>
        </div>
    )
}

//================Export================//
export default Show
