import React, { useContext } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter,  Button } from 'reactstrap'
import { ComponentContext } from "../../Providers/ComponentProvider"
import { WindowStateContext } from "../../Providers/WindowStateProvider";

const DeleteComponentModal = (props) => {
  const { displayComponent } = useContext(ComponentContext);
  const { openDeleteModal } = useContext(WindowStateContext)

  return (
    <div >
      <Modal isOpen={openDeleteModal}>
          <ModalHeader >You are about to delete {displayComponent.componentName}</ModalHeader>
          <ModalBody>
              This will delete all associated bids and images. Are you sure you want to continue?
          </ModalBody>
          <ModalFooter>
          <Button color="primary" onClick={() => props.cancelDelete()}>Cancel</Button>{' '}
          <Button color="primary" onClick={() => props.completeDelete()}>Delete</Button>{' '}
          </ModalFooter>
      </Modal>
    </div>
  )
}
export default DeleteComponentModal

