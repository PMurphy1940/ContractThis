import React, { useState, useEffect, useContext } from 'react'
import { SubContractorContext } from "../../Providers/SubContractorProvider"
import { WindowStateContext } from "../../Providers/WindowStateProvider"
import SubContractorSearchResultCard from "./SubContractorSearchResultCard"
import FadeIn from "../../Helpers/FadeIn"


const SearchSubcontractor = (props) => {
    const [selectedTypes, setSelectedTypes] = useState()
    const [noneSelected, setNoneSelected] = useState(true)
    const [searchButtonState, setSearchButtonState] = useState("search_Button")
    

    const {
        subContractors, 
        subContractorTypes, 
        GetSubContractorTypes,
        GetSubContractorsByType
    } = useContext(SubContractorContext)

    const { setShowSearchSubs, setShowImages, showSearchSubs } = useContext(WindowStateContext)

    const addIsSelected = () => {
        let tempArray = subContractorTypes.map((type) => {
                type.isSelected = false
            return type
        })
        setSelectedTypes(tempArray);
    }

    const handleFieldChange = (e) => {
        let q = []
        for (let i = 0; i < selectedTypes.length; i++){
            if (selectedTypes[i].isSelected === true){
                q.push(selectedTypes[i].id) 
            }
        }
        setSearchButtonState("search_Button_Active")
        setNoneSelected(false);
        let tempArray = [...selectedTypes];
        const target = e.target.checked    
        let index = selectedTypes.findIndex(type => type.id == e.target.id)
        tempArray[index].isSelected = target
        if (tempArray[index].isSelected == true){
            q.push(tempArray[index].id)
        }
        else {
            let qIndex = q.findIndex(id => id == tempArray[index].id)
            console.log("Index",qIndex)
            q.splice(qIndex, 1)
        }
        if (q.length===0){
            setNoneSelected(true)
            setSearchButtonState("search_Button")
        }
        setSelectedTypes(tempArray) 
    }

    useEffect(() => {
        GetSubContractorTypes()
    }, [])

    useEffect(() => {
        addIsSelected()
    }, [subContractorTypes])

    const SubCheckboxElement = (props) => {
        return (
            <div className="form-check grid" key={props.type.id}>
                <input className="form-check-input" type="checkbox" value={props.type.id} id={props.type.id} checked={props.type.isSelected} onChange={props.handleFieldChange}/>
                <label className="form-check-label" htmlFor={props.type.id}>
                {props.type.specialty}
                </label>
            </div>
        )
    }

    const findSubs = () => {
        let q = []
        for (let i = 0; i < selectedTypes.length; i++){
            if (selectedTypes[i].isSelected === true){
                q.push(selectedTypes[i].id) 
            }
        }
        q = q.toString(",")
        GetSubContractorsByType(q)
    }
  
    
    return (
        <FadeIn
            paused="true"
            direction='up'
            distance='1000'
            >
            <div className="large_Component_Detail_Images_Card">
                
                <h4 className="Images_Banner">Search Subcontractors
                    <button className="fas fa-minus-circle project_Cancel" onClick={() => props.cancelSearch() }/>
                </h4>
                <div className="search_Container_Large">
                    <div className="search_LeftAndRight">
                        <div className="search_Top">
                            <form classname="search_Checkboxes">
                                {subContractorTypes.map((type) => 
                                    <SubCheckboxElement
                                    key={type.id}
                                    type={type}
                                    handleFieldChange={handleFieldChange} 
                                    />
                                    )}
                            </form>
                            <div className="search_Subs_Button">
                                <button id={searchButtonState} className="fas fa-hammer delete_Button" disabled={noneSelected} onClick={() => findSubs() }>Go get 'em</button>
                            </div>
                        </div>
                        <div className="search_Results">
                            {subContractors.map((sub) => 
                                <SubContractorSearchResultCard 
                                key={sub.id}
                                firstConversation={props.firstConversation}
                                sub={sub}
                                />
                                )}
                        </div>
                    </div>
                </div>
            </div>
        </FadeIn>
    )
}

export default SearchSubcontractor