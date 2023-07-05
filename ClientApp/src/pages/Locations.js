import { Card, CardBody, Container, Spinner } from "reactstrap";
import { useState, useEffect, useContext } from "react";
import LocationsTable from "../Components/Location/LocationsTable";
import { AuthContext } from "../contexts/AuthContext";

const Locations = () => {
  const { jwtToken } = useContext(AuthContext);

  const [locations, setLocations] = useState(null);

  useEffect(() => {
    // Fetch data from the Locations endpoint
    fetch("api/Locations", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    })
      .then((response) => response.json())
      .then((locationsData) => {
        // Fetch data from the Jobs endpoint
        fetch("api/Jobs", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        })
          .then((response) => response.json())
          .then((jobsData) => {
            // Match location ids and count the number of jobs for each location
            const updatedLocations = locationsData.map((location) => ({
              ...location,
              count: jobsData.filter((job) => job.locationId === location.id)
                .length,
            }));

            // Set the updated locations data in the state
            setLocations(updatedLocations);
          })
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <Container fluid>
      <div className="p-4">
        <h4 className="text-center p-4" style={{ color: "wheat" }}>
          Available locations with available jobs count
        </h4>
        {locations === null && <Spinner />}
        {locations && (
          <Card>
            <CardBody>
              <LocationsTable locations={locations} />
            </CardBody>
          </Card>
        )}
      </div>
    </Container>
  );
};

export default Locations;
