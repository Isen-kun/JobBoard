import React, { useState, useEffect, useContext } from "react";
import { Modal, ModalHeader, ModalBody, Button, Spinner } from "reactstrap";
import { AuthContext } from "../../contexts/AuthContext";

const InfoModal = ({ isOpen, toggle, job }) => {
  const { jwtToken } = useContext(AuthContext);

  const [employer, setEmployer] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      fetchEmployerInfo();
    }
  }, [isOpen]);

  const fetchEmployerInfo = () => {
    fetch(`api/Employers/${job.EmployerId}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setEmployer(data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };

  const onClose = () => {
    setEmployer(null);
    toggle();
  };

  return (
    <Modal isOpen={isOpen} toggle={onClose}>
      <ModalHeader toggle={onClose}>Employer Details</ModalHeader>
      <ModalBody>
        {loading && <Spinner color="primary" />}
        {!loading && employer && (
          <div>
            <div className="mb-3">
              <strong>Company Name:</strong> {employer.companyName}
            </div>
            <div className="mb-3">
              <strong>Contact Name:</strong> {employer.contactName}
            </div>
            <div className="mb-3">
              <strong>Contact Email:</strong> {employer.contactEmail}
            </div>
            <div className="mb-3">
              <strong>Contact Phone:</strong> {employer.contactPhone}
            </div>
          </div>
        )}
        {!loading && !employer && <div>No employer information available.</div>}
        <Button color="secondary" onClick={onClose}>
          Close
        </Button>
      </ModalBody>
    </Modal>
  );
};

export default InfoModal;
