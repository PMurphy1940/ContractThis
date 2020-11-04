import React, { useState, useContext, useRef } from 'react';
import { ProjectContext } from "../../../Providers/ProjectProvider";
import FadeIn from "../../../Helpers/FadeIn";
import { Form, FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText, Alert } from "reactstrap";
import { ImageContext } from "../../../Providers/ImageProvider";

const ProjectForm = (props) => {
    const [saveButton, setSaveButton] = useState(false);
    const [saveButtonClass, setSaveButtonClass] = useState("project_Save")
    const [projNameReq, setProjNameReq] = useState(false);
    const [projDescReq, setProjDescReq] = useState(false);
    const [badNumbers, setBadNumbers] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const { uploadImage } = useContext(ImageContext);
    const imageUrl = useRef();
    const [projectToAdd, setProjectToAdd] = useState({ 
                                            projectName: "", 
                                            locationName: "", 
                                            locationAddress: "", 
                                            projectDescription: "", 
                                            budget: "", 
                                            imageLocation: ""
                                        })
    const {
        AddNewProject
    } =useContext(ProjectContext)

    const handleFieldChange = (event) => {
        const stateToChange = { ...projectToAdd };
        stateToChange[event.target.id] = event.target.value;
        setProjectToAdd(stateToChange);
        setSaveButtonClass("project_Save_Active")
        setSaveButton(true);
        setProjNameReq(false);
        setProjDescReq(false);
        setBadNumbers(false);
      };

    const previewImage = evt => {
        if (evt.target.files.length) {
            setImagePreview(URL.createObjectURL(evt.target.files[0]));
        }
    };

    const previewImageUrl = evt => {
        if (evt.target.value.length) {
            setImagePreview(evt.target.value);
        }
    }

    const SaveNewProject = () => {
        //Form validation//
        if (projectToAdd.projectName === ""){
            setProjNameReq(true)
            return
        }
        if (projectToAdd.projectDescription === ""){
            setProjDescReq(true)
            return
        }

        projectToAdd.budget = parseInt(projectToAdd.budget)
        //Check to see if the parseInt returned NaN//
        if ( projectToAdd.budget !== Number(projectToAdd.budget)){
            setBadNumbers(true)
            return
        }

        const file = document.querySelector('input[type="file"]').files[0];

        if (file !== undefined) {
            const fileName = file.name.split('.');

            const availFileTypes = [
                'png', 'PNG', 'bmp','BMP', 'jpeg', 'JPEG', 
                 'jpg', 'JPG', 'gif', 'GIF'
            ];

            if (!availFileTypes.includes(fileName[1])) {
                alert(`Sorry, file type ${fileName[1]} is not supported. Accepted Image File Types: .png, .gif, .jpg, .jpeg, and .bmp`);
                return;
            }
            else {
                //Append the end of the filename to reduce the chance of duplicates being in the database
                let appendKey = `${new Date().getTime()}`;
                appendKey = appendKey.slice(-6);
                const newImageName = `${fileName[0]}${appendKey}.${fileName[1]}`;

                const formData = new FormData();
                formData.append('file', file, newImageName);

                uploadImage(formData, newImageName);
                projectToAdd.imageLocation = newImageName;
            }
        }
        else if (file === undefined && imageUrl.value !== "") {
            projectToAdd.imageLocation = imageUrl.value;
        }
        AddNewProject(projectToAdd);
     };

    return (
        <>
        <div className="project_Add_New_Form">
                    <FadeIn
                        paused="true"
                        direction='right'
                        distance='600'
                            >
                        <h6 className="add_Project_Banner">Add New Project
                            <div>
                                <button id={saveButtonClass} disabled={!saveButton} className="far fa-check-circle" onClick={() => SaveNewProject() }/>
                                <button className="fas fa-minus-circle project_Cancel" onClick={() => props.cancelAdd() }/>
                            </div>
                        </h6>
                        <fieldset className="projectForm form">
                            <div className="project_Form_Left_Side">
                                <label htmlFor="projectName" className="form_input">Project Name</label>
                                <input
                                    id="projectName"
                                    className="form_input"
                                    innerref="projectName"
                                    onChange={ (e) => handleFieldChange(e)}
                                    value={projectToAdd.projectName}
                                />
                                {(projNameReq) ? <p className="required">Project name required</p> : <p> </p>}
                                <label htmlFor="locationName" className="form_input">Location Name</label>
                                <input
                                    id="locationName"
                                    className="form_input"
                                    innerref="locationName"
                                    onChange={ (e) => handleFieldChange(e)}
                                    value={projectToAdd.locationName}
                                />
                                <label htmlFor="locationAddress" className="form_input">Location Address</label>
                                <input
                                    id="locationAddress"
                                    className="form_input"
                                    innerref="locationAddress"
                                    onChange={ (e) => handleFieldChange(e)}
                                    value={projectToAdd.locationAddress}
                                />
                                <label htmlFor="projectDescription" className="form_input">Project Description</label>
                                <textarea
                                    id="projectDescription"
                                    className="form_input"
                                    rows="4"
                                    innerref="projectDescription"
                                    onChange={ (e) => handleFieldChange(e)}
                                    value={projectToAdd.projectDescription}
                                />
                                {(projDescReq) ? <p className="required">Project description required</p> : <p></p>}
                                <label htmlFor="budget" className="form_input">budget</label>
                                <input
                                    id="budget"
                                    className="form_input"
                                    innerref="budget"
                                    onChange={ (e) => handleFieldChange(e)}
                                    value={projectToAdd.budget}
                                />
                                {(badNumbers) ? <p className="required">Budget must be a number</p> : <p></p>}
                                
                            </div>
                            <Form>
                            <div className="project_Form_Right_Side">
                            <FormGroup>
                                <Label for="imageUpload">Upload an Image</Label>
                                <Input
                                    type="file"
                                    name="file"
                                    id="imageUpload"
                                    onChange={previewImage}
                                    onClick={() => imageUrl.current.value = ""} />
                                <InputGroup className="mt-2">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>OR</InputGroupText>
                                    </InputGroupAddon>

                                    <Input
                                        type="text"
                                        name="imageUrl"
                                        id="imageUrl"
                                        innerRef={imageUrl}
                                        placeholder="Input an Image URL"
                                        onChange={previewImageUrl}

                                    />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                {
                                    imagePreview === null ?
                                        <Alert color="light">No image provided.</Alert>
                                        : <img src={imagePreview} alt="preview" className="img-thumbnail" />
                                }
                            </FormGroup>
                            </div>
                            </Form>
                        </fieldset>
                    </FadeIn>
                </div>
        </>
    )
}

export default ProjectForm