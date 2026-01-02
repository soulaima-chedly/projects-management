"use client";

import { ReactNode, useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Session, User } from "@supabase/supabase-js";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      const result = await supabase.auth.getSession();
      if ("data" in result && result.data.session) {
        setSession(result.data.session);
        setUser(result.data.session.user);
      } else {
        setSession(null);
        setUser(null);
      }
      setLoading(false);
    };

    fetchSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user ?? null);
      if (!newSession?.user) router.push("/login");
    });

    return () => subscription.unsubscribe();
  }, [router]);

  if (loading) return <p className="text-center p-4">Loading...</p>;

  // Guard: redirect if no user
  if (!user) return null;

  return <>{children}</>;
};
