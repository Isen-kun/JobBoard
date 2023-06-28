import { Table, Button } from "reactstrap";

const JobsTable = ({ jobs }) => {
  const onApply = (job) => {
    console.log("View:", job);
  };

  return (
    <Table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Employer</th>
          <th>Title</th>
          <th>Description</th>
          <th>Type</th>
          <th>Salary</th>
          <th>Category</th>
          <th>Skill</th>
          <th>Location</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {jobs.map((job) => (
          <tr key={job.Id}>
            <td>{job.Id}</td>
            <td>{job.Employer}</td>
            <td>{job.Title}</td>
            <td>{job.Description}</td>
            <td>{job.JobType}</td>
            <td>{job.Salary}</td>
            <td>{job.Category}</td>
            <td>{job.Skill}</td>
            <td>{job.Location}</td>
            <td>
              <Button color="primary" size="sm" onClick={() => onApply(job)}>
                Apply
              </Button>{" "}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default JobsTable;
