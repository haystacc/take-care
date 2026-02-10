import { Button } from "@/components/ui/button";
import Header from "./../Header";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { notify } from "@/Helper";

function Dashboard() {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignout = async (e) => {
    e.preventDefault();
    const res = await signOut();
    if (res.success) {
      navigate('/');
    } else {
      notify.error(res.error.message);
    }
  }

  return (
    <>
      <Header />
      <Button variant="outline" onClick={handleSignout}>Sign Out</Button>
    </>
  );
}

export default Dashboard;