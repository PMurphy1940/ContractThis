import React, { useContext, useEffect } from 'react';
import { ProjectContext } from "../../Providers/ProjectProvider"
import { ChatContext } from "../../Providers/ChatProvider"


const DetailedComponentCard = (props) => {
    const { displayProject } = useContext(ProjectContext);
    let total = 0;
    let labor = 0;
    let percent = 0;
    
    const { chat, GetChatByComponentId } = useContext(ChatContext);

    useEffect(()=> {
        GetChatByComponentId(props.displayComponent.id)
    }, [props.displayComponent.id])
    
    const totalExpeditures = () => {
        if(props.displayComponent !== undefined && chat !== undefined && chat.fee !== undefined) {
            labor = chat.fee
            return props.displayComponent.materialCost + chat.fee
        }
        else {
            return props.displayComponent.materialCost
        }
    }
    total = totalExpeditures();

    const budgetPercent = () => {
        
        return Math.floor(total/displayProject.budget*100)
    }
    percent = budgetPercent();


    return (
        <div className="large_Component_Detail_Card">
            <button className="project_Link_Button">
                <h4 className="Description_Banner">Description</h4>
                <div className="detail_Text">
                    <p className="large_Component_Description" >{props.displayComponent.componentDescription}</p>
                </div>
                <h4 className="Description_Banner">{props.displayComponent.componentName} Expeditures</h4>
                <div className="large_Component_Below_Description">
                    <p className="component_Budget">Materials: ${props.displayComponent.materialCost}</p>
                    <p className="component_Budget">Labor: ${labor}</p>
                    <div className="totals_Div">
                        <p className="component_Total">Total: ${total}</p> 
                        <p className="component_Total">{percent}% of budget</p> 
                    </div>
                </div>
            </button>
            <div className="search_Subs">
                <button className="fas fa-hammer delete_Button" onClick={() => props.bigDetailPage(props.displayComponent.id) }>Find A Subcontractor</button>
            </div>
            <div className="project_component_Button_Container">
                <button className="far fa-edit delete_Button" onClick={() => props.editComponent(props.displayComponent.id) }/>
                <button className="far fa-trash-alt delete_Button" onClick={() => props.deleteThisComponent(props.displayComponent.id) }/>
            </div>
        </div> 
    )
}

export default DetailedComponentCard

