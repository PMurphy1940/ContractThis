import React, { useContext } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { LoginContext } from "../../Providers/LoginStateProvider"

import FadeIn from "../../Helpers/FadeIn"
const SubcontractorForm = () => {

    const { subcontractorBusinessName, setSubcontractorBusinessName,
            subcontractorImageUrl, setSubcontractorImageUrl} =useContext(LoginContext)

    return (
        <FadeIn
            paused="true"
            direction='left'
            distance='300'
                            >
                <div className="sub_Side_Popout">
                <div className="inner_Form_Box">
                        <fieldset>
                            <FormGroup>
                                <Label htmlFor="subcontractorBusinessName">Business Name</Label>
                                <Input id="subcontractorBusinessName" type="text" onChange={e => setSubcontractorBusinessName(e.target.value)} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="subcontractorImageUrl">Logo</Label>
                                <Input id="subcontractorImageUrl" type="text" onChange={e => setSubcontractorImageUrl(e.target.value)} />
                            </FormGroup>
                        </fieldset>
                    </div>
                </div>
        </FadeIn>
    )
}

export default SubcontractorForm