import React, { useContext, useState } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Row,
  Col,
  Input,
  Button,
  Label,
  Spinner,
} from "reactstrap";
import { AuthContext } from "../../contexts/AuthContext";

const ApplicantDashboard = ({
  user,
  totalApplications,
  totalSelectedApplications,
}) => {
  const { currentUser, jwtToken } = useContext(AuthContext);

  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);
  const [isSaving, setIsSaving] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsSaving(true); // set isSaving to true to show the Spinner
    setIsEditing(false);
    const userToUpdate = {
      name: editedUser.name,
      email: editedUser.email,
      password: "password are immutable",
      roleId: 0,
    };
    fetch(`https://localhost:44438/api/Users/${currentUser.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(userToUpdate),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setIsSaving(false); // set isSaving to false to hide the Spinner
      })
      .catch((error) => {
        console.log(error);
        setIsSaving(false); // set isSaving to false to hide the Spinner
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <div className="">
      <h3>Welcome, {user.name}!</h3>
      <Row>
        <Col md="8">
          <Card color="info" outline>
            <CardBody>
              <CardTitle className="text-center">
                <strong>User Information</strong>
              </CardTitle>
              <CardText>
                <Label for="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  value={editedUser.name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
                <br />
                <Label for="email">Email Address</Label>
                <Input
                  type="email"
                  name="email"
                  value={editedUser.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
                <br />
                {/* <strong>Role:</strong> {user.Role} */}
                <Label for="Role">User Role</Label>
                <Input
                  type="text"
                  name="Role"
                  value={user.roleName}
                  disabled={true}
                />
                <br />
                {!isEditing ? (
                  <Button color="primary" onClick={handleEdit}>
                    Edit
                  </Button>
                ) : (
                  <div>
                    {isSaving ? (
                      <Spinner color="warning" />
                    ) : (
                      <>
                        <Button color="success" onClick={handleSave}>
                          Save
                        </Button>{" "}
                        <Button
                          color="secondary"
                          onClick={() => setIsEditing(false)}
                        >
                          Cancel
                        </Button>
                      </>
                    )}
                  </div>
                )}
              </CardText>
            </CardBody>
          </Card>
        </Col>
        <Col md="4" className="mt-5">
          <Row className="p-4">
            <Col>
              <Card color="warning" outline>
                {currentUser.roleName === "applicant" && (
                  <CardBody>
                    <CardTitle tag="h5" className="p-2">
                      Total Applied Applications
                    </CardTitle>
                    <CardText className="text-center">
                      <strong>{totalApplications}</strong>
                    </CardText>
                  </CardBody>
                )}
                {currentUser.roleName === "employer" && (
                  <CardBody>
                    <CardTitle tag="h5" className="p-2">
                      Total Applications posted
                    </CardTitle>
                    <CardText className="text-center">
                      <strong>{totalApplications}</strong>
                    </CardText>
                  </CardBody>
                )}
              </Card>
            </Col>
          </Row>
          <Row className="p-4">
            <Col>
              <Card color="success" outline>
                {currentUser.roleName === "applicant" && (
                  <CardBody>
                    <CardTitle tag="h5" className="p-2">
                      Total SelectedApplications
                    </CardTitle>
                    <CardText className="text-center">
                      <strong>{totalSelectedApplications}</strong>
                    </CardText>
                  </CardBody>
                )}
                {currentUser.roleName === "employer" && (
                  <CardBody>
                    <CardTitle tag="h5" className="p-2">
                      Total Candidates Selected
                    </CardTitle>
                    <CardText className="text-center">
                      <strong>{totalSelectedApplications}</strong>
                    </CardText>
                  </CardBody>
                )}
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default ApplicantDashboard;
