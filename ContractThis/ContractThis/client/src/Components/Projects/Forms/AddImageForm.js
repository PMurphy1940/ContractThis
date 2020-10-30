import React, { useState, useContext } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { ComponentContext } from "../../../Providers/ComponentProvider"
import { WindowStateContext } from "../../../Providers/WindowStateProvider"

const AddImageForm = () => {
    const [url, setUrl] = useState('')

    const {
        displayComponent
    } = useContext(WindowStateContext)
    
    const {
        AddNewImage
    } = useContext(ComponentContext)
    
    const SaveImageLink = () => {
        const imageObject = { 
             ProjectComponentId: displayComponent.id,
             ProjectComponentImageUrl: url
                 }
        AddNewImage(imageObject)
    } 

    return (
        <Form onSubmit={SaveImageLink}>
            <fieldset>
                <FormGroup>
                    <Label for="url">Image URL</Label>
                    <Input id="url" type="text" onChange={e => setUrl(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Button>Save</Button>
                </FormGroup>
            </fieldset>
        </Form>
    )
}

export default AddImageForm