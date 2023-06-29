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

  const onDownload = async (application) => {
    console.log("download application id:", application);

    try {
      // Make the fetch request to the backend to download the file
      const response = await fetch(
        `api/Applications/AppResume/${application.id}`,
        {
          method: "GET",
        }
      );

      // Convert the response to a blob object
      const blob = await response.blob();

      // Create a URL for the blob object using the URL.createObjectURL method
      const url = URL.createObjectURL(blob);

      // Create a link element to trigger the download
      const link = document.createElement("a");
      link.href = url;
      link.download = `resume-${application.resumeName}.pdf`; // Set the file name for the downloaded file
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error occurred while downloading the file", error);
    }
  };

  return (
    <div>
      <h5>Here are your previous applications:</h5>
      {applications === null && <Spinner />}
      {applications !== null && (
        <Card>
          <CardBody>
            <ApplicationsTable
              applications={applications}
              onDownload={onDownload}
            />
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default ApplicationsApplicant;
