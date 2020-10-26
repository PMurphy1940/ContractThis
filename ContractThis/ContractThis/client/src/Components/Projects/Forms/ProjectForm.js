import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText, Alert } from 'reactstrap'

const ProjectForm = (props) => {

    const [projectName, setProjectName] = useState("")
    const [locationName, setLocationName] = useState("")
    const [locationAddress, setLocationAddress] = useState("")
    const [projectDescription, setProjectDescription] = useState("")
    const [budget, setBudget] = useState(0)
    const [imageLocation, setImageLocation] = useState("")

    return (
        <>
        <Form encType="multipart/form-data" className="form">
                            <FormGroup>
                                <Label for="projectName">Project Name</Label>
                                <Input
                                    id="projectName"
                                    innerRef="projectName"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="locationName">Location Name</Label>
                                <Input id="locationName" innerRef="locationName" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="locationAddress">location Address</Label>
                                <Input id="locationAddress" innerRef="locationAddress" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="locationName">Location Name</Label>
                                <Input  id="locationName" innerRef="locationName" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="projectDescription">Project Description</Label>
                                <Input type="textarea" rows="4" id="projectDescription" innerRef="projectDescription" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="budget">budget</Label>
                                <Input  id="budget" innerRef="budget" />
                            </FormGroup><FormGroup>
                                <Label for="imageLocation">Image Location</Label>
                                <Input  id="imageLocation" innerRef="imageLocation" />
                            </FormGroup>
                        </Form>
        <button onClick={() => {props.cancelAdd()}}>Cancel</button>
        </>
    )
}

export default ProjectForm