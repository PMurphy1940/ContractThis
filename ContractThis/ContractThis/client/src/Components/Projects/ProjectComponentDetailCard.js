import React, { useContext } from 'react';
import ImageCard from "./DetailComponents/ImageCard"
import AddImageForm from "./Forms/AddImageForm"
import { WindowStateContext } from "../../Providers/WindowStateProvider"

const ProjectComponentDetailCard = (props) => {

    const { addImageWindowOpen } = useContext(WindowStateContext);

    let indexDelay = 1

    return (
        <div className="project_Component_Detail_Card">
            <h4 className="detail_Banner">{props.displayComponent.componentName}</h4>
            <div className="detail_Text">
                <p className="detail_Description" >{props.displayComponent.componentDescription}</p>
                <p className="detail_Budget">Cost to date: ${props.displayComponent.materialCost}</p>
            </div>
            <div className="project_component_Button_Container">
                <button className="far fa-list-alt delete_Button" onClick={() => props.bigDetailPage(props.displayComponent.id) }/>
                <button className="far fa-edit delete_Button" onClick={() => props.editComponent(props.displayComponent.id) }/>
                <button className="far fa-trash-alt delete_Button" onClick={() => props.deleteThisComponent(props.displayComponent.id) }/>
            </div>
            <div className="image_Gallery">
                <h6>Images
                    <button className="far fa-image project_Add" onClick={() => props.addImage(props.displayComponent.id) }>+</button>
                </h6>
                <div className="images_Container">
                    {addImageWindowOpen ? 
                        <AddImageForm />
                        :
                        <ImageCard
                            indexDelay={indexDelay++} 
                            />  
                    }
                </div>
            </div>
        </div>
    )
}

export default ProjectComponentDetailCard
