import React from 'react';
import { useHistory } from 'react-router-dom'



const ProjectCard = (props) => {
    const history = useHistory();
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
                <button className="far fa-list-alt delete_Button" onClick={() => history.push("/components") }/>
                <button className="far fa-edit delete_Button" onClick={() => props.editProject(props.project.id) }/>
                <button className="far fa-trash-alt delete_Button" onClick={() => props.deleteThisProject(props.project.id) }/>
            </div>       
    )
}

export default ProjectCard

