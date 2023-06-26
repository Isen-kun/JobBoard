import { Button } from "reactstrap";

const LogoutAll = () => {
  const handleLogut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    console.log("Logged Out");
  };

  return (
    <Button outline size="sm" onClick={handleLogut}>
      <strong>Log out</strong>
    </Button>
  );
};

export default LogoutAll;
