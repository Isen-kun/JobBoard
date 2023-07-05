import { useState, useEffect, useContext } from "react";
import { Container, Alert, Spinner } from "reactstrap";
import Dashboard from "../Components/Dashboard/Dashboard";
import { AuthContext } from "../contexts/AuthContext";

const Home = () => {
  const { currentUser, jwtToken } = useContext(AuthContext);

  const [employer, setEmployer] = useState(null);
  const [totalApplications, setTotalApplications] = useState(0);
  const [totalSelectedApplications, setTotalSelectedApplications] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [totalJobsPosted, setTotalJobsPosted] = useState(0);
  const [totalSelectedApplicants, setTotalSelectedApplicants] = useState(0);
  const [error, setError] = useState(null);

  // Fetch employer data and filter for the current user's employer
  useEffect(() => {
    setIsLoading(true);
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
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  }, [currentUser.id, jwtToken]);

  //For Application data fetching
  useEffect(() => {
    const fetchApplications = () => {
      setIsLoading(true);
      fetch(`api/Applications`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          const userApplications = data.filter(
            (app) => app.userId === currentUser.id
          );
          const totalApplicationsCount = userApplications.length;
          const totalSelectedApplicationsCount = userApplications.filter(
            (app) => app.status === "Accepted"
          ).length;
          setTotalApplications(totalApplicationsCount);
          setTotalSelectedApplications(totalSelectedApplicationsCount);
        })
        .catch((error) => {
          setError(error.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    fetchApplications();
  }, [currentUser.id, jwtToken]);

  //For Employer data fetching
  useEffect(() => {
    if (employer) {
      setIsLoading(true);
      // Fetch jobs data for the current employer
      fetch("api/Jobs", {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          const selectedJobs = data.filter(
            (job) => job.employerId === employer.id
          );
          setTotalJobsPosted(selectedJobs.length);

          // Filter applications for the selected jobs with status "Accepted"
          const selectedJobIds = selectedJobs.map((job) => job.id);
          console.log(selectedJobIds);
          return fetch(`api/Applications`, {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              const selectedApplications = data.filter((application) =>
                selectedJobIds.includes(application.jobId)
              );
              console.log(selectedApplications);
              const selectedApplications2 = selectedApplications.filter(
                (application) => application.status === "Accepted"
              );
              console.log(selectedApplications2);
              setTotalSelectedApplicants(selectedApplications2.length);
            });
        })
        .then(() => setIsLoading(false))
        .catch((error) => {
          setError(error);
          setIsLoading(false);
        });
    }
  }, [employer, jwtToken]);

  return (
    <Container className="px-5">
      {error && <Alert color="danger">{error}</Alert>}
      <div className="pt-4">
        {isLoading ? (
          <div className="text-center">
            <Spinner color="info" />
          </div>
        ) : (
          <Dashboard
            user={currentUser}
            totalApplications={totalApplications}
            totalSelectedApplications={totalSelectedApplications}
            totalJobsPosted={totalJobsPosted}
            totalSelectedApplicants={totalSelectedApplicants}
          />
        )}
      </div>
    </Container>
  );
};

export default Home;
