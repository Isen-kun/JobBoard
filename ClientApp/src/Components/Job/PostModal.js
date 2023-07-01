import { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

const PostModal = ({
  isOpen,
  toggle,
  employerId,
  locations,
  skills,
  categories,
  onPost,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [locationId, setLocationId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [skillId, setSkillId] = useState("");
  const [jobType, setJobType] = useState("");
  const [salary, setSalary] = useState(""); // New attribute
  const createdAt = new Date().toISOString();

  const handlePost = (e) => {
    e.preventDefault();
    const job = {
      title: title,
      description: description,
      locationId: locationId,
      categoryId: categoryId,
      skillId: skillId,
      employerId: employerId,
      jobType: jobType,
      salary: salary, // Include the salary attribute in the job object
      createdAt: createdAt,
    };
    onPost(job);
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Post a Job</ModalHeader>
      <ModalBody>
        <Form onSubmit={handlePost}>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input
              type="text"
              name="title"
              id="title"
              placeholder="Enter job title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="description">Description</Label>
            <Input
              type="textarea"
              name="description"
              id="description"
              placeholder="Enter job description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="location">Location</Label>
            <Input
              type="select"
              name="location"
              id="location"
              value={locationId}
              onChange={(e) => setLocationId(e.target.value)}
            >
              <option value="">Select a location</option>
              {locations.map((location) => (
                <option key={location.id} value={location.id}>
                  {location.city}, {location.state}
                </option>
              ))}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="category">Category</Label>
            <Input
              type="select"
              name="category"
              id="category"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="skill">Skill</Label>
            <Input
              type="select"
              name="skill"
              id="skill"
              value={skillId}
              onChange={(e) => setSkillId(e.target.value)}
            >
              <option value="">Select a skill</option>
              {skills.map((skill) => (
                <option key={skill.id} value={skill.id}>
                  {skill.name}
                </option>
              ))}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="salary">Salary</Label> {/* New input field */}
            <Input
              type="text"
              name="salary"
              id="salary"
              placeholder="Enter job salary"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="employerId">Employer ID</Label>
            <Input
              type="text"
              name="employerId"
              id="employerId"
              value={employerId}
              disabled
            />
          </FormGroup>
          <FormGroup>
            <Label for="createdAt">Created At</Label>
            <Input
              type="text"
              name="createdAt"
              id="createdAt"
              value={createdAt}
              disabled
            />
          </FormGroup>
          <FormGroup>
            <Label for="jobType">Job Type</Label>
            <Input
              type="select"
              name="jobType"
              id="jobType"
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
            >
              <option value="">Select a job type</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Freelance">Freelance</option>
            </Input>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handlePost}>
          Post Job
        </Button>{" "}
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default PostModal;
