import React from 'react';


const DetailedComponentCard = (props) => {

    return (
            <div className="large_Component_Detail_Card">
                <button className="project_Link_Button">
                    <h4 className="large_Detail_Banner">{props.component.componentName}</h4>
                    <div className="detail_Text">
                        <p className="large_Component_Description" >{props.component.componentDescription}</p>
                    </div>
                    <div className="large_Component_Below_Description">
                        <p className="detail_Budget">Material Cost: ${props.component.materialCost}</p>
                        <p className="detail_Budget">Cost to date: ${props.component.materialCost}</p>
                    </div>
                </button>
                <div className="search_Subs">
                    <button className="fas fa-hammer delete_Button" onClick={() => props.bigDetailPage(props.component.id) }>Find A Subcontractor</button>
                </div>
                <div className="project_component_Button_Container">
                    <button className="far fa-edit delete_Button" onClick={() => props.editComponent(props.component.id) }/>
                    <button className="far fa-trash-alt delete_Button" onClick={() => props.deleteThisComponent(props.component.id) }/>
                </div>
            </div>
    )
}

export default DetailedComponentCard
      // <img className="project_Image" src={props.project.imageLocation} />