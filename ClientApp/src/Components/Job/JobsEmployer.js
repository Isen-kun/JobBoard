import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Spinner, Card, CardBody } from "reactstrap";
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
  const [trigger, setTrigger] = useState(false);

  // Fetch employer data and filter for the current employer
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
  const fetchJobs = () => {
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

        Promise.all([
          fetch("api/Skills", {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }).then((response) => response.json()),
          fetch("api/Categories", {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }).then((response) => response.json()),
          fetch("api/Locations", {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }).then((response) => response.json()),
        ])
          .then(([skillsData, categoriesData, locationsData]) => {
            const modifiedJobs = employerJobs.map((job) => {
              const skill = skillsData.find((s) => s.id === job.skillId);
              const category = categoriesData.find(
                (c) => c.id === job.categoryId
              );
              const location = locationsData.find(
                (l) => l.id === job.locationId
              );

              return {
                Id: job.id,
                EmployerId: job.employerId,
                Employer: "You",
                Title: job.title,
                Description: job.description,
                JobType: job.jobType,
                Salary: job.salary,
                Category: category ? category.name : "",
                Skill: skill ? skill.name : "",
                Location: location ? `${location.city}, ${location.state}` : "",
              };
            });

            setJobs(modifiedJobs);
            setLoading(false);
          })
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    if (employer) {
      fetchJobs();
    }
  }, [employer, jwtToken, trigger]);

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
    toggleModal();
    setLoading(true);

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
        fetchJobs();
        setTrigger(!trigger);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  const onDelete = (job) => {
    setLoading(true); // set loading to true
    fetch(`api/Jobs/${job.Id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete job");
        }
        setLoading(false); // set loading to false
      })
      .then((data) => {
        fetchJobs();
        setTrigger(!trigger);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false); // set loading to false
      });
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
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h5 className="p-2">Job Listings for {employer?.companyName}</h5>
            <Button
              color="success"
              onClick={toggleModal}
              className="m-3 btn-sm"
            >
              Add Job
            </Button>
          </div>
          {loading ? (
            <Spinner color="primary" />
          ) : jobs?.length > 0 ? (
            <Card>
              <CardBody>
                <JobsTable
                  jobs={jobs}
                  onDelete={onDelete}
                  onApply={() => {}}
                  onInfo={() => {}}
                />
              </CardBody>
            </Card>
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
