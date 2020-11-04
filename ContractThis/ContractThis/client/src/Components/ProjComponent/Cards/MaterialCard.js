import React from 'react';

const MaterialCard = (props) => {

    return (
        <tr>
            <th scope="row">
                {props.material.materialName}
            </th>
            <td>
                ${props.material.cost}
            </td>
            <td>{props.material.quantityRequired}</td>
        </tr>
    )
}

export default MaterialCard

