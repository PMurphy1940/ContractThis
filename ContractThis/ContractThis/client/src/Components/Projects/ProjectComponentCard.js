import React from 'react';
import { Link } from 'react-router-dom'
import FadeIn from "../../Helpers/FadeIn"


const ProjectComponentCard = (props) => {

    return (
        <FadeIn
            paused="true"
            delay= {(props.indexDelay * .5)}
            direction='right'>
                <div className="project_Component_Card">
                    <button className="component_Link_Button" onClick={ () => props.selectComponentDisplay(props.component.id) }>
                        <div className="inside_Button_Container">
                            <div className="address">
                                <p>{props.component.componentName}</p>

                            </div>
                            <Link to="" className="find_A_Sub_Link" >Find a Sub</Link>
                        </div>
                    </button>
                </div>
        </FadeIn>
    )
}

export default ProjectComponentCard
      // <img className="project_Image" src={props.project.imageLocation} />