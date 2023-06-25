import { Button } from "reactstrap";

const LogoutAll = () => {
  const handleLogut = () => {
    console.log("Logged Out");
  };

  return (
    <Button outline size="sm" onClick={handleLogut}>
      <strong>Log out</strong>
    </Button>
  );
};

export default LogoutAll;
