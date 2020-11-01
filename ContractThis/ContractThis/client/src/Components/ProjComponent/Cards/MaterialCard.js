import React from 'react';

const MaterialCard = (props) => {

    return (
        <tr>
            <th scope="row">
                {props.material.material}
            </th>
            <td>
                {props.material.cost}
            </td>
            <td>{props.material.quantity}</td>
        </tr>
    )
}

export default MaterialCard

