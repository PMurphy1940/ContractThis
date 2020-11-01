import React from 'react';

const MaterialCardExpanded = (props) => {

    return (
        <tr>
            <th scope="row">
                {props.material.material}
            </th>
            <td>
                {props.material.cost}
            </td>
            <td>{props.material.quantity}</td>
            <td>{props.material.description}</td>
        </tr>
    )
}

export default MaterialCardExpanded

