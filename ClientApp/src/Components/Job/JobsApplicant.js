import JobsTable from "./JobsTable";
import { Card, CardBody } from "reactstrap";

const JobsApplicant = () => {
  const dummyJobs = [
    {
      Id: 1,
      Employer: "Company A",
      Title: "Software Engineer",
      Description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      JobType: "Full-time",
      Salary: "$100,000",
      Category: "IT",
      Skill: "React, JavaScript",
      Location: "New York",
    },
    {
      Id: 2,
      Employer: "Company B",
      Title: "Data Analyst",
      Description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      JobType: "Part-time",
      Salary: "$60,000",
      Category: "Data Science",
      Skill: "Python, SQL",
      Location: "San Francisco",
    },
  ];

  return (
    <div>
      <h6>Here are the jobs you have applied for:</h6>
      {/* <Card className="shadow"> */}
      <Card>
        <CardBody>
          <JobsTable jobs={dummyJobs} />
        </CardBody>
      </Card>
    </div>
  );
};

export default JobsApplicant;
