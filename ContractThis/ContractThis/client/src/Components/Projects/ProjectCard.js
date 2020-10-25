import React from 'react';
import FadeIn from "../../Helpers/FadeIn"


const ProjectCard = (props) => {
console.log(props)
    return (
            <div className="project_Card">
                <button className="project_Link_Button" onClick={ () => props.selectDisplay(props.project.id) }>
                    <div className="inside_Button_Container">
                        <div className="address">
                            <p>{props.project.projectName}</p>
                            <p>{props.project.locationAddress}</p>
                        </div>
                        <img className="project_Image" src={props.project.imageLocation} />
                    </div>
                </button>
            </div>       
    )
}

export default ProjectCard