import React, { useContext } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { LoginContext } from "../../Providers/LoginStateProvider"

import FadeIn from "../../Helpers/FadeIn"
const SubcontractorForm = () => {

    const { screenName, subcontractorBusinessName, setSubcontractorBusinessName,
            subcontractorImageUrl, setSubcontractorImageUrl, setBusinessStatement} =useContext(LoginContext)

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
                                <Input id="subcontractorBusinessName" type="text" placeholder={screenName} onChange={e => setSubcontractorBusinessName(e.target.value)} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="businessStatement">Business Statement</Label>
                                <Input type="textarea"  id="businessStatement" onChange={e => setBusinessStatement(e.target.value)} />
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