import React, { useContext } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter,  Button } from 'reactstrap';
import { WindowStateContext } from "../../Providers/WindowStateProvider";

const DeleteProjectModal = (props) => {
    const { openDeleteProjectModal } = useContext(WindowStateContext);

  return (
    <div >
      <Modal isOpen={openDeleteProjectModal}>
          <ModalHeader >You are about to delete {props.projectToDelete.projectName}</ModalHeader>
          <ModalBody>
              This will delete all associated components, bids, and images. Are you sure you want to continue?
          </ModalBody>
          <ModalFooter>
          <Button color="primary" onClick={() => props.cancelDelete()}>Cancel</Button>{' '}
          <Button color="primary" onClick={() => props.completeDelete()}>Delete</Button>{' '}
          </ModalFooter>
      </Modal>
    </div>
  )
}
export default DeleteProjectModal

