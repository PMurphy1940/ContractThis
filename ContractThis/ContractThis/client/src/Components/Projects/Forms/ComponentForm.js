import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText, Alert } from 'reactstrap'

const ComponentForm = (props) => {

    const [componentName, setComponentName] = useState("")
    const [componentDescription, setComponentDescription] = useState("")
    const [materialCost, setMaterialCost] = useState(0)

    return (
        <>
            <Form encType="multipart/form-data">
                <FormGroup>
                    <Label for="componentName">Component Name</Label>
                    <Input
                        id="componentName"
                        innerRef="componentName"
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="componentDescription">Component Description</Label>
                    <Input type="textarea" rows="4" id="componentDescription" innerRef="componentDescription" />
                </FormGroup>
                <FormGroup>
                    <Label for="materialCost">Material Cost</Label>
                    <Input  id="materialCost" innerRef="materialCost" />
                </FormGroup>
            </Form>
        </>
    )
}

export default ComponentForm