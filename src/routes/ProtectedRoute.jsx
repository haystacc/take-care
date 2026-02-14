import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ClimbingBoxLoader } from "react-spinners";

function ProtectedRoute() {
  const {session, loading} = useAuth();

  if (loading) {
    return (<div className="flex justify-center items-center h-screen">
      <ClimbingBoxLoader />
    </div>)
  } 

  if (!session) {
    return (<>
      <Navigate to="/signin" replace/>
    </>)
  }

  return <Outlet />
}

export default ProtectedRoute;