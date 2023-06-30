import { useState, useEffect, useContext } from "react";
import { Container, Alert, Spinner } from "reactstrap";
import Dashboard from "../Components/Dashboard/Dashboard";
import { AuthContext } from "../contexts/AuthContext";

const Home = () => {
  const { currentUser, jwtToken } = useContext(AuthContext);

  const [totalApplications, setTotalApplications] = useState(0);
  const [totalSelectedApplications, setTotalSelectedApplications] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`api/Applications`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        const data = await response.json();
        const userApplications = data.filter(
          (app) => app.userId === currentUser.id
        );

        const totalApplicationsCount = userApplications.length;
        const totalSelectedApplicationsCount = userApplications.filter(
          (app) => app.status === "Selected"
        ).length;

        setTotalApplications(totalApplicationsCount);
        setTotalSelectedApplications(totalSelectedApplicationsCount);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplications();
  }, [currentUser.id]);

  return (
    <Container>
      {error && <Alert color="danger">{error}</Alert>}
      <div className="pt-4">
        {isLoading ? (
          <div className="text-center">
            <Spinner color="info" />
          </div>
        ) : (
          <Dashboard
            user={currentUser}
            totalApplications={totalApplications}
            totalSelectedApplications={totalSelectedApplications}
          />
        )}
      </div>
    </Container>
  );
};

export default Home;
