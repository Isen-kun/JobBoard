import { useContext } from "react";
import { Table, Button, Spinner } from "reactstrap";
import { AuthContext } from "../../contexts/AuthContext";

const ApplicationsTable = ({
  applications,
  onDownload,
  onWithdraw,
  onView,
  onAccept,
}) => {
  const { currentUser } = useContext(AuthContext);

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
            {currentUser.roleName === "applicant" && (
              <td>
                <Button
                  color="info"
                  size="sm"
                  onClick={() => onDownload(application)}
                >
                  Download Resume 📩
                </Button>
              </td>
            )}
            {currentUser.roleName === "applicant" && (
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
            )}
            {currentUser.roleName === "employer" && (
              <td>
                <Button
                  color="info"
                  size="sm"
                  onClick={() => onView(application)}
                >
                  View Resume
                </Button>
              </td>
            )}
            {currentUser.roleName === "employer" &&
            application.status === "Applied" ? (
              <td>
                <Button
                  color="success"
                  size="sm"
                  onClick={() => onAccept(application)}
                >
                  Accept Applicant
                </Button>
              </td>
            ) : (
              <td>
                <Button color="secondary" size="sm" disabled>
                  Already accepted
                </Button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ApplicationsTable;
