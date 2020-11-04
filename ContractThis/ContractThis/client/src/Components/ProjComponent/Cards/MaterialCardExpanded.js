import React from 'react';

const MaterialCardExpanded = (props) => {

    return (
        <tr>
            <th scope="row">
                {props.material.materialName}
            </th>
            <td>
                ${props.material.cost}
            </td>
            <td>{props.material.quantityRequired}</td>
            <td>{props.material.notes}</td>
        </tr>
    )
}

export default MaterialCardExpanded

