import { Table, Button } from "reactstrap";

const JobsTable = ({ jobs }) => {
  const onView = (job) => {
    console.log("View:", job);
  };

  const onEdit = (job) => {
    console.log("Edit:", job);
  };

  const onDelete = (job) => {
    console.log("Delete:", job);
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
          <th></th>
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
              <Button color="primary" size="sm" onClick={() => onView(job)}>
                View
              </Button>{" "}
            </td>
            <td>
              <Button color="info" size="sm" onClick={() => onEdit(job)}>
                Edit
              </Button>{" "}
            </td>
            <td>
              <Button color="danger" size="sm" onClick={() => onDelete(job)}>
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default JobsTable;
