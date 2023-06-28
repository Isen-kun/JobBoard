import { Card, CardBody, Container, Spinner } from "reactstrap";
import { useState, useEffect } from "react";
import CategoriesTable from "../Components/Category/CategoriesTable";

const Categories = () => {
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    // Fetch data from the Categories endpoint
    fetch("api/Categories")
      .then((response) => response.json())
      .then((categoriesData) => {
        // Fetch data from the Jobs endpoint
        fetch("api/Jobs")
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
        <h4>Here are all the available location with available jobs:</h4>
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
