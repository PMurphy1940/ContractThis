import React, { useState, useContext, useRef } from 'react';
import { Form, FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText, Alert, Button } from 'reactstrap';
import { ComponentContext } from "../../../Providers/ComponentProvider"
import { ImageContext } from "../../../Providers/ImageProvider";


const AddImageForm = () => {
    const [url, setUrl] = useState('')
    const [imagePreview, setImagePreview] = useState(null);
    const { uploadImage } = useContext(ImageContext);
    const imageUrl = useRef();

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
                imageObject.ProjectComponentImageUrl = newImageName;
            }
        }
        else if (file === undefined && imageUrl.value !== "") {
            imageObject.ProjectComponentImageUrl = imageUrl.value;
        }
        AddNewImage(imageObject)
    } 

    return (
        <Form onSubmit={SaveImageLink}>
            <fieldset>
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
                <FormGroup>
                    <Button>Save</Button>
                </FormGroup>
            </fieldset>
        </Form>
    )
}

export default AddImageForm