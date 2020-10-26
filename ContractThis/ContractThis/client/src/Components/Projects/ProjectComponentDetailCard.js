import React from 'react';


const ProjectComponentDetailCard = (props) => {

    return (
        <div className="project_Component_Detail_Card">
                <h4 className="detail_Banner">{props.displayComponent.componentName}</h4>
                <div className="detail_Text">
                    <p className="detail_Description" >{props.displayComponent.componentDescription}</p>
                    <p className="detail_Budget">Cost to date: ${props.displayComponent.materialCost}</p>
                </div>
        </div>
    )
}

export default ProjectComponentDetailCard