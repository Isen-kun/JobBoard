import { useContext } from "react";
import { Table, Button } from "reactstrap";
import { AuthContext } from "../../contexts/AuthContext";

const JobsTable = ({ jobs, onApply, onDelete, onInfo }) => {
  const { currentUser } = useContext(AuthContext);

  return (
    <Table borderless hover striped>
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
          {currentUser.roleName === "applicant" && <th></th>}
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
            {currentUser.roleName === "applicant" && (
              <td>
                <Button color="success" size="sm" onClick={() => onApply(job)}>
                  Apply
                </Button>
              </td>
            )}
            {currentUser.roleName === "applicant" && (
              <td>
                <Button color="info" size="sm" onClick={() => onInfo(job)}>
                  More Info
                </Button>
              </td>
            )}
            {currentUser.roleName === "employer" && (
              <td>
                <Button color="danger" size="sm" onClick={() => onDelete(job)}>
                  Delete Job
                </Button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default JobsTable;
