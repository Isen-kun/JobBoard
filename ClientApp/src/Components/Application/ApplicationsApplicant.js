import ApplicationsTable from "./ApplicationsTable";
import { Card, CardBody, Spinner } from "reactstrap";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const ApplicationsApplicant = () => {
  const { currentUser } = useContext(AuthContext);
  const [applications, setApplications] = useState(null);

  useEffect(() => {
    fetch("api/Applications")
      .then((response) => response.json())
      .then((data) => {
        const filteredData = data.filter((application) => {
          return application.userId === currentUser.id;
        });
        const promises = filteredData.map((application) => {
          return fetch(`api/Jobs/${application.jobId}`)
            .then((response) => response.json())
            .then((job) => {
              application.jobTitle = job.title;
              return application;
            });
        });
        Promise.all(promises).then((applicationsWithJobTitles) => {
          setApplications(applicationsWithJobTitles);
        });
      });
  }, [currentUser]);

  return (
    <div>
      <h5>Here are your previous applications:</h5>
      {applications === null && <Spinner />}
      {applications !== null && (
        <Card>
          <CardBody>
            <ApplicationsTable applications={applications} />
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default ApplicationsApplicant;
