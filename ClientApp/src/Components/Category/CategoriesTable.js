import { Table } from "reactstrap";

const CategoriesTable = ({ categories }) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Description</th>
          <th>Count</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((item, index) => (
          <tr key={item.id}>
            <th scope="row">{index + 1}</th>
            <td>{item.name}</td>
            <td>{item.description}</td>
            <td>{item.count}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CategoriesTable;
