import React from 'react';
import { Link } from 'react-router-dom'
import FadeIn from "../../Helpers/FadeIn"


const ProjectComponentCard = (props) => {

    return (
        <FadeIn
            paused="true"
            delay= {(props.indexDelay * .3)}
            direction='right'
            distance='200'
            >
                <div className="project_Component_Card">
                    <button className="component_Link_Button" onClick={ () => props.selectComponentDisplay(props.component.id) }>
                        <div className="inside_Button_Container">
                            <div className="address">
                                <p>{props.component.componentName}</p>

                            </div>
                        </div>
                    </button>
                </div>
        </FadeIn>
    )
}

export default ProjectComponentCard
      // <img className="project_Image" src={props.project.imageLocation} />