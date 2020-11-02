import React, { useContext, useEffect, useState } from 'react';
import { ProjectContext } from "../../Providers/ProjectProvider"
import { BidContext } from "../../Providers/BidProvider"
import { WindowStateContext } from "../../Providers/WindowStateProvider";
import { ComponentContext } from "../../Providers/ComponentProvider"
import materials from "../../Images/materials.png";
import MaterialCard from "./Cards/MaterialCard";
import MaterialCardExpanded from "./Cards/MaterialCardExpanded";
import InitialBidForm from "./Chats/InitialBidForm"

import ImageCard from "../Projects/DetailComponents/ImageCard";
import SearchSubcontractor from "../Subcontractor/SearchSubcontractors";
import AddImageForm from "../Projects/Forms/AddImageForm";
import { Table } from "reactstrap";
import FadeIn from "../../Helpers/FadeIn"
import MoveWithoutFade from "../../Helpers/MoveWithoutFade"



const DetailedComponentCard = (props) => {
    const { displayProject } = useContext(ProjectContext);
    const [materialShortList, setMaterialShortList] = useState([])
    
    //Future//For adding multiple contractors to the same component
    // const [componentContractors, setComponentContractors] = useState([])
    let total = 0;
    let labor = 0;
    let percent = 0;

//////Dummy Material List//////
 const materiallist = [
        {
        id: 1,
        material: "2x4",
        cost: 4.15,
        quantity: 10,
        description: "8 foot lengths"
        },
        {
        id: 2,
        material: "2x6",
        cost: 5.15,
        quantity: 10,
        description: "8 foot lengths"
       },
       {
        id: 3,
        material: "Deck screws-",
        cost: 8.19,
        quantity: 1,
        description: "Box of 100"
       },
       {
        id: 4,
        material: "Primer",
        cost: 14.78,
        quantity: 1,
        description: "Killz works great"
       },
       {
        id: 5,
        material: "White caulk",
        cost: 3.85,
        quantity: 5,
        description: "Exterior, NOT silicon! Look for the DAP 430"
       }
]
/////////////////////////////
    const { setShowSearchSubs, addImageWindowOpen, setAddImageWindowOpen, 
            showImages, setShowImages, showSearchSubs, viewShoppingList, setViewShoppingList,
            showBigShoppingList, setShowBigShoppingList, setInitialBidFormActive, initialBidFormActive } = useContext(WindowStateContext)
    
    const { bid, GetBidByComponentId } = useContext(BidContext);

    const { displayComponent, GetComponentById, 
        AddCompletedDateToComponent } = useContext(ComponentContext);

    useEffect(()=> {
        const shortlist = () => { 
            let list = []
            for ( let i=0; i<3; i++){
                if(materiallist[i] !== undefined) {
                    list.push(materiallist[i])
                    
                }
            } return list;
        }
        setMaterialShortList(shortlist);
    }, [])

    useEffect(()=> {
        GetBidByComponentId(displayComponent.id)
    }, [displayComponent.id])
    


    const totalExpeditures = () => {
        if(displayComponent !== undefined && bid !== undefined && bid.fee !== undefined) {
            labor = bid.fee
            return displayComponent.materialCost + bid.fee
        }
        else {
            return displayComponent.materialCost
        }
    }
    total = totalExpeditures();

    const budgetPercent = () => {
        
        return Math.floor(total/displayProject.budget*100)
    }
    percent = budgetPercent();

    const SearchSubs = () => {
        setShowBigShoppingList(false);
        setShowImages(true);
        setShowSearchSubs(true);
    }
    const addImage = () => {
        setAddImageWindowOpen(!addImageWindowOpen)
    }

    const ShowFullShoppingList = () => {
        setViewShoppingList(false);
        setShowImages(false);
        setShowBigShoppingList(true);

    }

    const closeBigShoppingList = () => {
        setViewShoppingList(true);
        setShowBigShoppingList(false);
        setShowImages(true);
    }

    const cancelSearch = () => {
        setShowSearchSubs(false)
    }

    const firstConversation = (id) => {
        setInitialBidFormActive(true);
    }

    const cancelAdd = () => {
        setInitialBidFormActive(false);
        setShowSearchSubs(false)
    }

    const subcontractorChat = () => {
        if (initialBidFormActive) {
            return (
                <InitialBidForm />
            )
        }
        // else {
        //     return (
        //         <SubContractorChat />
        //     )
        // }
    }
    let indexDelay = 1

    const rightsideElements = () => {
        if (showImages){
            return (
                <>
                {showSearchSubs ? 
                <MoveWithoutFade
                    direction='left'
                    distance='330'
                >
                <div className="large_Component_Detail_Images_Card">
                    <h4 className="Images_Banner">Images
                        <button className="far fa-image project_Add" onClick={() => addImage(displayComponent.id) }>+</button>
                    </h4>
                    <div className="images_Container_Large">
                        {addImageWindowOpen ? 
                            <AddImageForm />
                            :
                            <>
                            {(displayComponent !== undefined && displayComponent.componentImages !== null) && displayComponent.componentImages.map((image) =>
                            <div>
                                <img className="component_Image" src={image.projectComponentImageUrl} key={image.id} />
                            </div>
                            )}
                            </> 
                        }
                    </div>
                </div>
                </MoveWithoutFade>
                :
                <div className="large_Component_Detail_Images_Card">
                    <h4 className="Images_Banner">Images
                        <button className="far fa-image project_Add" onClick={() => addImage(displayComponent.id) }>+</button>
                    </h4>
                    <div className="images_Container_Large">
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
            }
                </>
            )
        }

        else if (!showImages && showBigShoppingList){
            return (
                <FadeIn
                    paused="true"
                    direction='right'
                    distance='600'
                    >
                    <h4 className="shopping_List_Banner">Shopping list <button className="far fa-eye-slash delete_Button" onClick={() => closeBigShoppingList() }/></h4>
                    <div className="shopping_List_Expanded">
                        <div id="materialListContainer">
                        <Table>
                            <thead>
                                <tr>
                                    <th>Material</th>
                                    <th>Cost</th>
                                    <th>Quantity</th>
                                    <th>Notes</th>
                                </tr>
                            </thead>
                            <tbody >
                            {materiallist.map((material) => (
                                    <MaterialCardExpanded 
                                        key={material.id}
                                        material={material}/>
                            ))}
                            </tbody>
                            </Table>
                        </div>
                    </div>
                </FadeIn>
            )
        }
    }

    const contractorSide = () => {
        if(!initialBidFormActive){
            return (
                <SearchSubcontractor
                    firstConversation={firstConversation}
                    cancelSearch={cancelSearch}
                 />
            )
        }
        else if (initialBidFormActive) {
            return (
                <InitialBidForm 
                    cancelAdd={cancelAdd}
                    />
            )
        }
    }

    return (
    <div className="details_Rightside_Whole_Container">
        <div className="large_Component_Detail_Card">
            <div className="large_Component_Detail_Card_Child">
                <h4 className="Description_Banner">Description
                    <button className="far fa-edit delete_Button" onClick={() => props.editComponent(props.displayComponent.id) }/>
                    <button className="far fa-trash-alt delete_Button" onClick={() => props.deleteThisComponent(props.displayComponent.id) }/>
                </h4>
                <div className="detail_Text">
                    <p className="large_Component_Description" >{displayComponent.componentDescription}</p>
                </div>
                {viewShoppingList ? 
                <h4 className="Description_Banner">Shopping list <button className="far fa-eye-slash delete_Button" onClick={() => setViewShoppingList(!viewShoppingList) }/></h4>
                :
                <h4 className="Description_Banner">Shopping list <button className="far fa-eye delete_Button" onClick={() => setViewShoppingList(!viewShoppingList) }/></h4>
                }
                {viewShoppingList &&
                <div className="shopping_List">
                    <div id="materialListContainer">
                    <Table>
                        <thead>
                            <tr>
                                <th>Material</th>
                                <th>Cost</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody >
                        {materialShortList.map((material) => (
                                <MaterialCard 
                                    key={material.id}
                                    material={material}/>
                        ))}
                        </tbody>
                        </Table>
                        {(materiallist.length > 3) && 
                        <p>...more</p>
                        }
                    </div>
                    <button className="materials_button" onClick={() => ShowFullShoppingList()}>
                        View full list
                        <img id="building_Materials_Image" src={materials} alt="building materials"/>
                    </button>
                </div>
                }
                <h4 className="Description_Banner">{displayComponent.componentName} Expeditures</h4>
                <div className="large_Component_Below_Description">
                    <div className="budget_Materials">
                        <p className="component_Budget">Materials: ${displayComponent.materialCost}</p>
                        
                    </div>
                    <div className="budget_Labor">
                        <p className="component_Budget">Labor: ${labor}</p>
                    </div>
                    <div className="totals_Div">
                        <p className="component_Total">Total: ${total}</p> 
                        <p className="component_Total">{percent}% of budget</p> 
                    </div>
                </div>
            </div>
            <div className="search_Subs">
                <button className="fas fa-hammer delete_Button" onClick={() => SearchSubs(displayComponent.id) }>Find A Subcontractor</button>
            </div>
        </div>
        <div className="rightside_Detail_Elements">
            {(!showBigShoppingList && showSearchSubs) && 
            contractorSide()
            }
            {rightsideElements()}
        </div>
    </div> 
    )
}

export default DetailedComponentCard

