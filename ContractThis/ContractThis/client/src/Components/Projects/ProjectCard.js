import React, { useEffect, useState } from 'react';
import ImageChecker from "../../Helpers/ImageUrlChecker"


const ProjectCard = (props) => {
    const [image, setImage] = useState(props.project.imageLocation)
    
useEffect(() => {
    setImage(ImageChecker.convertPath(props.project.imageLocation))
}, [])


    return (
            <div className="project_Card">
                <button className="project_Link_Button" onClick={ () => props.selectDisplay(props.project.id) }>
                    <div className="inside_Button_Container">
                        <div className="address">
                            <p>{props.project.projectName}</p>
                            <p>{props.project.locationAddress}</p>
                        </div>
                        <img className="project_Image" src={image} />
                    </div>
                </button>
                <div className="project_Card_Button_Space">
                    <button className="far fa-list-alt delete_Button" onClick={() => props.bigDetailPage(props.project.id) }/>
                    <button className="far fa-edit delete_Button" onClick={() => props.editProject(props.project.id) }/>
                    <button className="far fa-trash-alt delete_Button" onClick={() => props.deleteThisProject(props.project.id) }/>
                </div>
            </div>       
    )
}

export default ProjectCard

