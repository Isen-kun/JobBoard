import { Card, CardBody, Container, Spinner } from "reactstrap";
import { useState, useEffect, useContext } from "react";
import SkillsTable from "../Components/Skill/SkillsTable";
import { AuthContext } from "../contexts/AuthContext";

const Skills = () => {
  const { jwtToken } = useContext(AuthContext);

  const [skills, setSkills] = useState(null);

  useEffect(() => {
    // Fetch data from the Skills endpoint
    fetch("api/Skills", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    })
      .then((response) => response.json())
      .then((skillsData) => {
        // Fetch data from the Jobs endpoint
        fetch("api/Jobs", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        })
          .then((response) => response.json())
          .then((jobsData) => {
            // Match location ids and count the number of jobs for each skill
            const updatedSkills = skillsData.map((skill) => ({
              ...skill,
              count: jobsData.filter((job) => job.skillId === skill.id).length,
            }));

            // Set the updated skills data in the state
            setSkills(updatedSkills);
          })
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));
  }, []);
  return (
    <Container fluid>
      <div className="p-4">
        <h4>Here are all the available skills with available jobs:</h4>
        {skills === null && <Spinner />}
        {skills && (
          <Card>
            <CardBody>
              <SkillsTable skills={skills} />
            </CardBody>
          </Card>
        )}
      </div>
    </Container>
  );
};

export default Skills;
