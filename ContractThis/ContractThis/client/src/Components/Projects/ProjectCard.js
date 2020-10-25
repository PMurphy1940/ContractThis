import React from 'react';


const ProjectCard = (props) => {
console.log(props)
    return (
        <div className="project_Card">
            <div className="address">
                <p>{props.project.projectName}</p>
                <p>{props.project.locationAddress}</p>
            </div>
            <img className="project_Image" src={props.project.imageLocation} />
        </div>
    )
}

export default ProjectCard