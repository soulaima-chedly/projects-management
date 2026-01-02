"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export const useSupabaseUser = () => {
    const [user, setUser] = useState<{ id: string; email: string } | null>(null);

    useEffect(() => {
        const getUser = async () => {
            const { data, error } = await supabase.auth.getUser();
            if (error) {
                console.error("Failed to get user:", error);
                setUser(null);
            } else if (data.user) {
                setUser({ id: data.user.id, email: data.user.email! });
            } else {
                setUser(null);
            }
        };

        getUser();
    }, []);

    return { user };
};
