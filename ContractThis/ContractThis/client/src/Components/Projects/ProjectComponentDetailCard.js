import React, { useContext, useEffect } from 'react';
import ImageCard from "./DetailComponents/ImageCard";
import AddImageForm from "./Forms/AddImageForm";
import { WindowStateContext } from "../../Providers/WindowStateProvider";
import { ComponentContext } from "../..//Providers/ComponentProvider";

const ProjectComponentDetailCard = (props) => {

    const { addImageWindowOpen } = useContext(WindowStateContext);
    const { images, displayComponent, GetComponentById, 
            AddCompletedDateToComponent } = useContext(ComponentContext);

    let indexDelay = 1

useEffect(()=> {
    GetComponentById(displayComponent.id)
}, [])


const MarkComponentComplete = () => {
    AddCompletedDateToComponent(displayComponent);
}
    return (
        <div className="project_Component_Detail_Card">
            <h4 className="detail_Banner_With_Button">{displayComponent.componentName}
                <button className="fas fa-flag-checkered complete_Button" onClick={() => MarkComponentComplete() }>
                <div>
                    Complete
                </div>
                </button>
            </h4>
            <div className="detail_Text">
                <p className="detail_Description" >{displayComponent.componentDescription}</p>
                <p className="detail_Budget">Cost to date: ${displayComponent.materialCost}</p>
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
                        <>
                        {(displayComponent !== undefined && displayComponent.componentImages !== null) && displayComponent.componentImages.map((image) =>
                        <ImageCard
                            image={image}
                            key={image.id}
                            indexDelay={indexDelay++} 
                            /> 
                         )}
                            </> 
                    }
                </div>
            </div>
        </div>
    )
}

export default ProjectComponentDetailCard
