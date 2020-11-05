import React, { useContext } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useHistory, Link } from "react-router-dom";
import { ProfileContext } from "../../Providers/ProfileProvider";
import { LoginContext } from "../../Providers/LoginStateProvider"
import { SubContractorContext } from "../../Providers/SubContractorProvider"
import LocalUserProvider from "../../Helpers/LocalUserGets"
import SubcontractorForm from "./SubcontractorForm"

export default function Register() {

    const { firstName, setFirstName, lastName, setLastName, screenName, setScreenName,
            email, setEmail, imageLocation, setImageLocation,
            password, setPassword, confirmPassword, setConfirmPassword,
            isSubcontractor, setIsSubcontractor, subcontractorBusinessName, 
            subcontractorImageUrl} =useContext(LoginContext)

    const history = useHistory();
    const { register } = useContext(ProfileContext);
    const { RegisterSubcontractor } = useContext(SubContractorContext)


    const registerClick = (e) => {
        e.preventDefault();
        if (password && password !== confirmPassword) {
            alert("Passwords must match");
        } 
        else {
          
            const userProfile = { firstName, lastName, screenName, imageLocation, email, isSubcontractor };
            register(userProfile, password)
                .then(() => registerNewSubcontractor());
            }
    };

    const registerNewSubcontractor = () => {
      if (isSubcontractor){
        const subContractorProfile = { subcontractorBusinessName, subcontractorImageUrl };
        if (subContractorProfile.subcontractorBusinessName === ""){
          subContractorProfile.subcontractorBusinessName = screenName
        }
        subContractorProfile.userProfileId = LocalUserProvider.userId();
        RegisterSubcontractor(subContractorProfile)
      }
      history.push("/projects")
    }

return (
      <div className="outer_Container_Reg_Form">
        <div className="reg_And_Sub_Container">
          <div className="registration_Form">
            <div className="inner_Form_Box">
              <Form onSubmit={registerClick}>
                <fieldset>
                  <FormGroup>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" type="text" onChange={e => setFirstName(e.target.value)} />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" type="text" onChange={e => setLastName(e.target.value)} />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="screenName">Display Name</Label>
                    <Input id="screenName" type="text" onChange={e => setScreenName(e.target.value)} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input id="email" type="text" onChange={e => setEmail(e.target.value)} />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="imageLocation">Profile Image URL</Label>
                    <Input id="imageLocation" type="text" onChange={e => setImageLocation(e.target.value)} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="password">Password</Label>
                    <Input id="password" type="password" onChange={e => setPassword(e.target.value)} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="confirmPassword">Confirm Password</Label>
                    <Input id="confirmPassword" type="password" onChange={e => setConfirmPassword(e.target.value)} />
                  </FormGroup>
                  <FormGroup check>
                  <Label check>
                    <Input type="checkbox" id="isSubcontractor" onChange={e => setIsSubcontractor(!isSubcontractor)}/>{' '}
                    I'm A Subcontractor
                  </Label>
                </FormGroup>
                  <FormGroup>
                    <Button>Register</Button>
                  </FormGroup>
                </fieldset>
              </Form>
            </div>
            <em>
              <Link to="/login">Return to login</Link>
            </em>
          </div>
          
            {isSubcontractor && 
              <SubcontractorForm />
            }
         
        </div>
      </div>
  );
}
