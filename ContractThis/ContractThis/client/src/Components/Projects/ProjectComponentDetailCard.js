import React from 'react';


const ProjectComponentDetailCard = (props) => {

    return (
        <div className="project_Component_Card">
            
                <h4 className="detail_Banner">{props.displayComponent.componentName}</h4>
                <div className="address">
                    <p className="detail_Description" >{props.displayComponent.componentDescription}</p>
                    <p>{props.displayComponent.materialCost}</p>
                </div>
                       
        </div>
    )
}

export default ProjectComponentDetailCard