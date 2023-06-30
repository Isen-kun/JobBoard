import { Table, Button, Spinner } from "reactstrap";

const ApplicationsTable = ({ applications, onDownload, onWithdraw }) => {
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
            <td>{application.resumeName}</td>
            <td>
              <Button
                color="info"
                size="sm"
                onClick={() => onDownload(application)}
              >
                Download Resume 📩
              </Button>
            </td>
            <td>
              {application.isWithdrawing ? (
                <Spinner size="sm" color="light" />
              ) : (
                <Button
                  color="danger"
                  size="sm"
                  onClick={() => onWithdraw(application)}
                >
                  Withdraw Application
                </Button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ApplicationsTable;
