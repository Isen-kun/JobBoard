import { Table } from "reactstrap";

const LocationsTable = ({ locations }) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>City</th>
          <th>State</th>
          <th>Country</th>
          <th>Count</th>
        </tr>
      </thead>
      <tbody>
        {locations.map((item, index) => (
          <tr key={item.id}>
            <th scope="row">{index + 1}</th>
            <td>{item.city}</td>
            <td>{item.state}</td>
            <td>{item.country}</td>
            <td>{item.count}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default LocationsTable;
