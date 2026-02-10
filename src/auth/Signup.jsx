import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { notify } from "@/Helper";

// continue this later -> watch authentication video on yt 
function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signUp(email, password);
    if (res.success) {
      navigate('/journal'); // change this later
    } else {
      notify.error(res.error.message);
    }
  }

  return (
    <div>
      <form onSubmit={ handleSubmit } className="max-w-md mx-auto">
        <h3 className="text-xl font-bold mb-1">Sign up here!</h3>
        <p>
          Already have an account? <Link to="/signin" className="text-blue-500">Sign in here!</Link>
        </p>
         <div className="flex flex-col">
          <p className="mt-3 font-semibold">Your email</p>
          <input placeholder="name@gmail.com" type="email" value={email} onChange={e => setEmail(e.target.value)} className="border-solid border-2 p-3 mt-1" required/>
          <p className="mt-3 font-semibold">Your password</p>
          <input placeholder="••••••••" type="password" value={password} onChange={e => setPassword(e.target.value)} className="border-solid border-2 p-3 mt-1" required/>
          <button type="submit" className="border-solid border-2 p-3 mt-6 w-1/3">Sign Up</button>
        </div>
      </form>
    </div>
  )
}

export default Signup;