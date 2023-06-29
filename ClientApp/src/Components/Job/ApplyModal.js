import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
  Spinner,
} from "reactstrap";

const ApplyModal = ({ isOpen, toggle, selectedJob }) => {
  const { currentUser } = useContext(AuthContext);

  const [application, setApplication] = useState({
    UserId: currentUser.id,
    JobId: selectedJob.Id,
    Status: "Applied",
    AppliedAt: new Date().toISOString(),
    Resume: null,
  });

  const [isLoading, setLoading] = useState(false); // Add a new state variable

  const handleFileChange = (event) => {
    setApplication({
      ...application,
      Resume: event.target.files[0],
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setLoading(true); // Set the loading state to true

    // create a new FormData object to store the form data
    const formData = new FormData();
    formData.append("file", application.Resume);
    formData.append("UserId", application.UserId);
    formData.append("JobId", application.JobId);
    formData.append("Status", application.Status);
    formData.append("AppliedAt", application.AppliedAt);

    // make a POST request to submit the form data
    fetch("/api/Applications", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          // if the response is successful, close the modal and reset the form
          toggle();
          setApplication({
            UserId: "",
            JobId: "",
            Status: "Applied",
            AppliedAt: new Date().toISOString(),
            Resume: null,
          });
        } else {
          throw new Error("Failed to submit application");
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setLoading(false)); // Reset the loading state to false
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Apply for Job</ModalHeader>
      <form onSubmit={handleSubmit}>
        <ModalBody>
          <FormGroup>
            <Label for="userIdInput">User ID:</Label>
            <Input
              type="text"
              id="userIdInput"
              name="UserId"
              value={application.UserId}
              disabled
            />
          </FormGroup>
          <FormGroup>
            <Label for="jobIdInput">Job ID:</Label>
            <Input
              type="text"
              id="jobIdInput"
              name="JobId"
              value={application.JobId}
              disabled
            />
          </FormGroup>
          <FormGroup>
            <Label for="statusInput">Status:</Label>
            <Input
              type="text"
              id="statusInput"
              name="Status"
              value={application.Status}
              disabled
            />
          </FormGroup>
          <FormGroup>
            <Label for="appliedAtInput">Applied At:</Label>
            <Input
              type="text"
              id="appliedAtInput"
              name="AppliedAt"
              value={application.AppliedAt}
              disabled
            />
          </FormGroup>
          <FormGroup>
            <Label for="resumeInput">Resume:</Label>
            <Input
              type="file"
              id="resumeInput"
              name="Resume"
              onChange={handleFileChange}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          {isLoading ? ( // Conditional render based on the loading state
            <Spinner color="primary" />
          ) : (
            <Button color="primary" type="submit">
              Apply
            </Button>
          )}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};

export default ApplyModal;
