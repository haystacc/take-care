import { createContext, useState, useContext, useEffect } from "react";
import supabase from "@/utils/supabase";

const AuthContext = createContext();

export function AuthProvider({children}) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({data}) => {
      setUser(data.session.user);
      setSession(data.session);
      setLoading(false);
    })

    const {data: {subscription}} = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    })

    return () => subscription.unsubscribe();
  }, []);

  async function signUp(email, password, name) {
    const { data, error } = await supabase.auth.signUp(
      { email, 
        password,
        options: {
          data: { name: name }
        } 
      });
    if (error) {
      return { success: false, error };
    }
    return { success: true, data };
  }

  async function signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      return { success: false, error };
    }
    return { success: true, data };
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      return { success: false, error };
    }
    return { success: true };
  }

  return (
    <AuthContext.Provider value={{ user, session, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext);
}