import { Card, CardBody, Container, Spinner } from "reactstrap";
import { useState, useEffect, useContext } from "react";
import CategoriesTable from "../Components/Category/CategoriesTable";
import { AuthContext } from "../contexts/AuthContext";

const Categories = () => {
  const { jwtToken } = useContext(AuthContext);

  const [categories, setCategories] = useState(null);

  useEffect(() => {
    // Fetch data from the Categories endpoint
    fetch("api/Categories", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    })
      .then((response) => response.json())
      .then((categoriesData) => {
        // Fetch data from the Jobs endpoint
        fetch("api/Jobs", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        })
          .then((response) => response.json())
          .then((jobsData) => {
            // Match location ids and count the number of jobs for each category
            const updatedCategories = categoriesData.map((category) => ({
              ...category,
              count: jobsData.filter((job) => job.categoryId === category.id)
                .length,
            }));

            // Set the updated categories data in the state
            setCategories(updatedCategories);
          })
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <Container fluid>
      <div className="p-4">
        <h4 className="text-center p-4" style={{ color: "wheat" }}>
          Available categories with available jobs count
        </h4>
        {categories === null && <Spinner />}
        {categories && (
          <Card>
            <CardBody>
              <CategoriesTable categories={categories} />
            </CardBody>
          </Card>
        )}
      </div>
    </Container>
  );
};

export default Categories;
