import React, { useState } from "react";
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
} from "reactstrap";

const ApplicantDashboard = ({
  user,
  totalApplications,
  totalSelectedApplications,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
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
                <Label for="Name">Name</Label>
                <Input
                  type="text"
                  name="Name"
                  value={editedUser.name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
                <br />
                <Label for="Email">Email Address</Label>
                <Input
                  type="email"
                  name="Email"
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
                    <Button color="success" onClick={handleSave}>
                      Save
                    </Button>{" "}
                    <Button
                      color="secondary"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </Button>
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
                <CardBody>
                  <CardTitle tag="h5">Total Applied Applications</CardTitle>
                  <CardText>
                    <strong>{totalApplications}</strong>
                  </CardText>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row className="p-4">
            <Col>
              <Card color="success" outline>
                <CardBody>
                  <CardTitle tag="h5">Total Selected Applications</CardTitle>
                  <CardText>
                    <strong>{totalSelectedApplications}</strong>
                  </CardText>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default ApplicantDashboard;
