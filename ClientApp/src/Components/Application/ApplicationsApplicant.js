import ApplicationsTable from "./ApplicationsTable";
import { Card, CardBody, Spinner } from "reactstrap";
import { useState, useEffect } from "react";

const ApplicationsApplicant = () => {
  const [applications, setApplications] = useState(null);

  useEffect(() => {
    fetch("api/Applications")
      .then((response) => response.json())
      .then((data) => {
        const promises = data.map((application) => {
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
  }, []);

  return (
    <div>
      <h6>Here are your applications for:</h6>
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
