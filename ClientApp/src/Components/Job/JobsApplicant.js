import React, { useState, useEffect } from "react";
import JobsTable from "./JobsTable";
import { Card, CardBody, Spinner } from "reactstrap";

const JobsApplicant = () => {
  const [jobs, setJobs] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = () => {
    fetch("api/Jobs")
      .then((response) => response.json())
      .then((data) => {
        // Extract employer IDs, category IDs, skill IDs, and location IDs from the job data
        const employerIds = data.map((job) => job.employerId);
        const categoryIds = data.map((job) => job.categoryId);
        const skillIds = data.map((job) => job.skillId);
        const locationIds = data.map((job) => job.locationId);

        // Fetch employer data for each employer ID
        const employerPromises = employerIds.map((employerId) =>
          fetch(`api/Employers/${employerId}`)
            .then((response) => response.json())
            .then((employer) => employer.companyName)
        );

        // Fetch category data for each category ID
        const categoryPromises = categoryIds.map((categoryId) =>
          fetch(`api/Categories/${categoryId}`)
            .then((response) => response.json())
            .then((category) => category.name)
        );

        // Fetch skill data for each skill ID
        const skillPromises = skillIds.map((skillId) =>
          fetch(`api/Skills/${skillId}`)
            .then((response) => response.json())
            .then((skill) => skill.name)
        );

        // Fetch location data for each location ID
        const locationPromises = locationIds.map((locationId) =>
          fetch(`api/Locations/${locationId}`)
            .then((response) => response.json())
            .then((location) => location.city)
        );

        // Resolve all the promises for employer, category, skill, and location data
        Promise.all([
          ...employerPromises,
          ...categoryPromises,
          ...skillPromises,
          ...locationPromises,
        ])
          .then((results) => {
            const employerData = results.slice(0, employerIds.length);
            const categoryData = results.slice(
              employerIds.length,
              employerIds.length + categoryIds.length
            );
            const skillData = results.slice(
              employerIds.length + categoryIds.length,
              employerIds.length + categoryIds.length + skillIds.length
            );
            const locationData = results.slice(
              employerIds.length + categoryIds.length + skillIds.length
            );

            // Modify the job data to include employer, category, skill, and location information
            const modifiedJobs = data.map((job, index) => ({
              Id: job.id,
              EmployerId: job.employerId,
              Employer: employerData[index],
              Title: job.title,
              Description: job.description,
              JobType: job.jobType,
              Salary: job.salary,
              Category: categoryData[index],
              Skill: skillData[index],
              Location: locationData[index],
            }));

            setJobs(modifiedJobs);
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h6>Here are the jobs you have applied for:</h6>
      {jobs === null && <Spinner />}
      {jobs && (
        <Card>
          <CardBody>
            <JobsTable jobs={jobs} />
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default JobsApplicant;
