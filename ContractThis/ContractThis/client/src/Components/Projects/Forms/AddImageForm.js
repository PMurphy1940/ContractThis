import React, { useState, useContext } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { ComponentContext } from "../../../Providers/ComponentProvider"

const AddImageForm = () => {
    const [url, setUrl] = useState('')
    
    const {
        AddNewImage,
        displayComponent
    } = useContext(ComponentContext)
    
    const SaveImageLink = (e) => {
        e.preventDefault()
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