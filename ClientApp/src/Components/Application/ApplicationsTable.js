import { Table, Button } from "reactstrap";

const ApplicationsTable = ({ applications }) => {
  const onWithdraw = (application) => {
    console.log("Withdraw:", application);
  };

  const onEdit = (application) => {
    console.log("Edit:", application);
  };

  return (
    <Table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Job</th>
          <th>Status</th>
          <th>Applied At</th>
          <th>Resume</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {applications.map((application) => (
          <tr key={application.id}>
            <td>{application.id}</td>
            <td>{application.jobTitle}</td>
            <td>{application.status}</td>
            <td>{application.appliedAt}</td>
            <td>{application.resumeUrl}</td>
            <td>
              <Button
                color="warning"
                size="sm"
                onClick={() => onWithdraw(application)}
              >
                Withdraw
              </Button>
            </td>
            <td>
              <Button
                color="info"
                size="sm"
                onClick={() => onEdit(application)}
              >
                Edit
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ApplicationsTable;
