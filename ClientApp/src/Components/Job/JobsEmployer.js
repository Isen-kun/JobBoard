import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, Spinner } from "reactstrap";
import { AuthContext } from "../../contexts/AuthContext";
import JobsTable from "./JobsTable";
import PostModal from "./PostModal";

const JobsEmployer = () => {
  const { currentUser, jwtToken } = useContext(AuthContext);
  const [employer, setEmployer] = useState(null);
  const [jobs, setJobs] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [locations, setLocations] = useState([]);
  const [skills, setSkills] = useState([]);
  const [categories, setCategories] = useState([]);

  // Fetch employer data and filter for the current user's employer
  useEffect(() => {
    setLoading(true);
    fetch("api/Employers", {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const employerData = data.find(
          (employer) => employer.userId === currentUser.id
        );
        setEmployer(employerData);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, [currentUser.id, jwtToken]);

  // Fetch jobs data and filter for the current employer's jobs
  useEffect(() => {
    if (employer) {
      setLoading(true);
      fetch("api/Jobs", {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          const employerJobs = data.filter(
            (job) => job.employerId === employer.id
          );

          // Modify the job data to include employer, category, skill, and location information
          const modifiedJobs = employerJobs?.map((job) => ({
            Id: job.id,
            EmployerId: job.employerId,
            Employer: "You", // Set employer as "You" by default for every entry
            Title: job.title,
            Description: job.description,
            JobType: job.jobType,
            Salary: job.salary, // Include the salary attribute
            Category: job.categoryId, // Use the categoryId instead of categoryData[index]
            Skill: job.skillId, // Use the skillId instead of skillData[index]
            Location: job.locationId, // Use the locationId instead of locationData[index]
          }));

          setJobs(modifiedJobs);
          setLoading(false);
        })
        .catch((error) => console.error(error));
    }
  }, [employer, jwtToken]);

  // Fetch locations data
  useEffect(() => {
    setLoading(true);
    fetch("api/Locations", {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setLocations(data);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, [jwtToken]);

  // Fetch skills data
  useEffect(() => {
    setLoading(true);
    fetch("api/Skills", {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setSkills(data);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, [jwtToken]);

  // Fetch categories data
  useEffect(() => {
    setLoading(true);
    fetch("api/Categories", {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, [jwtToken]);

  const toggleModal = () => setModal(!modal);

  const handlePost = (job) => {
    setLoading(true);
    toggleModal(); // Close the modal before showing the spinner
    fetch("api/Jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(job),
    })
      .then((response) => response.json())
      .then((data) => {
        setJobs([...jobs, data]);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      {!employer ? (
        <div>
          <p>Add your employer information to start posting jobs:</p>
          <Link to="/employer" className="btn btn-primary">
            Add Employer Information
          </Link>
        </div>
      ) : (
        <div>
          <h6>Job Listings for {employer?.companyName}</h6>
          <Button color="primary" onClick={toggleModal}>
            Add Job
          </Button>
          {loading ? (
            <Spinner color="primary" />
          ) : jobs?.length > 0 ? (
            <JobsTable jobs={jobs} onDelete={() => {}} onApply={() => {}} />
          ) : (
            <p>No jobs found.</p>
          )}
        </div>
      )}
      <PostModal
        isOpen={modal}
        toggle={toggleModal}
        employerId={employer?.id}
        locations={locations}
        skills={skills}
        categories={categories}
        onPost={handlePost}
      />
    </div>
  );
};

export default JobsEmployer;
