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
          <tr key={application.Id}>
            <td>{application.Id}</td>
            <td>{application.Job}</td>
            <td>{application.Status}</td>
            <td>{application.AppliedAt}</td>
            <td>{application.Resume}</td>
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
