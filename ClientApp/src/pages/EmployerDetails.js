import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Spinner,
  Container,
} from "reactstrap";
import { AuthContext } from "../contexts/AuthContext";

const EmployerDetails = () => {
  const { currentUser, jwtToken } = useContext(AuthContext);

  const [employer, setEmployer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
  });

  useEffect(() => {
    setIsLoading(true);
    fetch("api/Employers", {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const userEmployer = data.find((emp) => emp.userId === currentUser.id);
        if (userEmployer) {
          setEmployer(userEmployer);
          setFormData({
            companyName: userEmployer.companyName,
            contactName: userEmployer.contactName,
            contactEmail: userEmployer.contactEmail,
            contactPhone: userEmployer.contactPhone,
          });
        } else {
          setEmployer(null);
          setFormData({
            companyName: "",
            contactName: "",
            contactEmail: "",
            contactPhone: "",
          });
        }
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  }, [currentUser.id, jwtToken]);

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);

    const endpoint = isEditing
      ? `api/Employers/${employer.id}`
      : "api/Employers";

    const method = isEditing ? "PUT" : "POST";

    fetch(endpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({
        userId: currentUser.id,
        companyName: formData.companyName,
        contactName: formData.contactName,
        contactEmail: formData.contactEmail,
        contactPhone: formData.contactPhone,
      }),
    })
      .then(() => {
        setIsEditing(false);
        setFormData({
          companyName: "",
          contactName: "",
          contactEmail: "",
          contactPhone: "",
        });
        setIsLoading(false);
        window.location.reload();
      })
      .catch((error) => console.error(error));
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  return (
    <Container className="p-5">
      <Form onSubmit={handleFormSubmit}>
        <FormGroup>
          <Label for="companyName">Company Name</Label>
          <Input
            type="text"
            name="companyName"
            id="companyName"
            placeholder="Enter your Company name"
            value={formData.companyName}
            onChange={handleInputChange}
            disabled={isLoading || (employer && !isEditing)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="contactName">Contact Name</Label>
          <Input
            type="text"
            name="contactName"
            id="contactName"
            placeholder="Enter your Contact name"
            value={formData.contactName}
            onChange={handleInputChange}
            disabled={isLoading || (employer && !isEditing)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="contactEmail">Contact Email</Label>
          <Input
            type="email"
            name="contactEmail"
            id="contactEmail"
            placeholder="Enter your Contact email"
            value={formData.contactEmail}
            onChange={handleInputChange}
            disabled={isLoading || (employer && !isEditing)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="contactPhone">Contact Phone</Label>
          <Input
            type="tel"
            name="contactPhone"
            id="contactPhone"
            placeholder="Enter your Contact Phone Number"
            value={formData.contactPhone}
            onChange={handleInputChange}
            disabled={isLoading || (employer && !isEditing)}
            required
          />
        </FormGroup>
        <Button
          type="submit"
          color={isEditing ? "warning" : "success"}
          disabled={isLoading}
        >
          {isLoading ? (
            <Spinner size="sm" color="light" />
          ) : isEditing ? (
            "Edit"
          ) : (
            "Add"
          )}
        </Button>
        {employer && (
          <Button
            type="button"
            color="primary"
            onClick={handleEditClick}
            disabled={isLoading}
            style={{ marginLeft: "10px" }}
          >
            {isLoading ? <Spinner size="sm" color="light" /> : "Edit Existing"}
          </Button>
        )}
      </Form>
    </Container>
  );
};

export default EmployerDetails;
