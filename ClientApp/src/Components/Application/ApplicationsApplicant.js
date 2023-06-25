import ApplicationsTable from "./ApplicationsTable";
import { Card, CardBody } from "reactstrap";

const ApplicationsApplicant = () => {
  const dummyApplications = [
    {
      Id: 1,
      Job: "Software Engineer",
      Status: "Applied",
      AppliedAt: "2023-06-20",
      Resume: "John Doe - Resume.pdf",
    },
    {
      Id: 2,
      Job: "Data Analyst",
      Status: "Withdrawn",
      AppliedAt: "2023-06-18",
      Resume: "Jane Smith - Resume.pdf",
    },
    // Add more dummy application objects as needed
  ];
  return (
    <div>
      <h6>Here are your applications for:</h6>
      {/* <Card className="shadow"> */}
      <Card>
        <CardBody>
          <ApplicationsTable applications={dummyApplications} />
        </CardBody>
      </Card>
    </div>
  );
};

export default ApplicationsApplicant;
