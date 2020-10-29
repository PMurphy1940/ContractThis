import React, { useState, useEffect, useContext } from 'react'
import { SubContractorContext } from "../../Providers/SubContractorProvider"
import SubContractorSearchResultCard from "./SubContractorSearchResultCard"

const SearchSubcontractor = () => {
    const [selectedTypes, setSelectedTypes] = useState()
    const [noneSelected, setNoneSelected] = useState(true)
    const [searchButtonState, setSearchButtonState] = useState("search_Button")

    const {
        subContractors, 
        subContractorTypes, 
        GetSubContractorTypes,
        GetSubContractorsByType
    } = useContext(SubContractorContext)

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
        console.log("qArray", q)
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
            <div className="form-check" key={props.type.id}>
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

    const openConversation = (id) => {
        
    }

    
    return (
        <>
        <p>SearchSubcontractor</p>
        <form>
            {subContractorTypes.map((type) => 
                <SubCheckboxElement
                    key={type.id}
                    type={type}
                    handleFieldChange={handleFieldChange} 
                    />
                )}
        </form>
        <div className="search_Subs">
            <button id={searchButtonState} className="fas fa-hammer delete_Button" disabled={noneSelected} onClick={() => findSubs() }>Go get 'em</button>
        </div>

        {subContractors.map((sub) => 
            <SubContractorSearchResultCard 
                key={sub.id}
                sub={sub}
                />
            )}
        </>
    )
}

export default SearchSubcontractor