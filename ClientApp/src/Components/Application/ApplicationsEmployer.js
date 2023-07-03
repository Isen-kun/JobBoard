import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import ApplicationsTable from "./ApplicationsTable";
import { Card, CardBody, Spinner } from "reactstrap";

const ApplicationsEmployer = () => {
  const { currentUser, jwtToken } = useContext(AuthContext);

  const [employer, setEmployer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [applications, setApplications] = useState([]);

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

  useEffect(() => {
    if (employer) {
      setLoading(true);
      fetch("api/Applications", {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          const filteredApplications = [];
          const fetchJobPromises = [];

          data.forEach((application) => {
            fetchJobPromises.push(
              fetch(`api/Jobs/${application.jobId}`, {
                headers: {
                  Authorization: `Bearer ${jwtToken}`,
                },
              })
                .then((response) => response.json())
                .then((job) => {
                  if (job.employerId === employer.id) {
                    filteredApplications.push({
                      ...application,
                      jobTitle: job.title, // Include job title in application data
                    });
                  }
                })
                .catch((error) => console.error(error))
            );
          });

          Promise.all(fetchJobPromises)
            .then(() => {
              setApplications(filteredApplications);
              setLoading(false);
            })
            .catch((error) => console.error(error));
        })
        .catch((error) => console.error(error));
    }
  }, [employer, jwtToken]);

  const onView = (application) => {
    const url = `api/Applications/AppResume/${application.id}`;

    fetch(url, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.blob();
      })
      .then((blob) => {
        const file = new Blob([blob], { type: "application/pdf" });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL, "_blank");
      })
      .catch((error) => {
        console.error("Error fetching PDF:", error);
      });
  };

  const onAccept = (application) => {
    setLoading(true);
    const url = `api/Applications/${application.id}`;
    const body = {
      userId: application.userId,
      jobId: application.jobId,
      status: "Accepted", // Change the status to "Accepted"
      appliedAt: application.appliedAt,
    };
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(body),
    };

    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Application updated successfully:", data);
      })
      .catch((error) => {
        console.error("Error updating application:", error);
        setLoading(false);
      });
  };

  return (
    <div>
      <h6>Applied applications for the employer</h6>
      {loading && <Spinner />}
      {applications.length === 0 && <div>No applications found.</div>}
      {applications.length > 0 && (
        <Card>
          <CardBody>
            <ApplicationsTable
              applications={applications}
              onView={onView}
              onAccept={onAccept}
              onDownload={() => {}}
              onWithdraw={() => {}}
            />
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default ApplicationsEmployer;
