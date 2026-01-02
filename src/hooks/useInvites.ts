"use client";

import { useState, useCallback, useEffect } from "react";
import { supabase } from "@/lib/supabase";

type Invite = {
    id: string;
    org_id: string;
    email: string;
    token: string;
    accepted_at: string | null;
    created_at: string;
};

export const useInvites = (orgId: string) => {
    const [invites, setInvites] = useState<Invite[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchInvites = useCallback(async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from("invites")
            .select("*")
            .eq("org_id", orgId);

        if (error) console.error(error);
        setInvites((data as Invite[]) ?? []);
        setLoading(false);
    }, [orgId]);

    const createInvite = useCallback(
        async (email: string) => {
            const token = crypto.randomUUID();
            const { data, error } = await supabase
                .from("invites")
                .insert([{ org_id: orgId, email, token }])
                .select()
                .single();

            if (error) throw error;
            const invite = data as Invite;
            setInvites((prev) => [...prev, invite]);
            return invite.token;
        },
        [orgId]
    );

    const acceptInvite = useCallback(async (token: string) => {
        const { data, error } = await supabase
            .from("invites")
            .update({ accepted_at: new Date().toISOString() })
            .eq("token", token)
            .select()
            .single();

        if (error) throw error;
        const updated = data as Invite;
        setInvites((prev) =>
            prev.map((i) => (i.id === updated.id ? updated : i))
        );
        return updated;
    }, []);

    useEffect(() => {
        fetchInvites();
    }, [fetchInvites]);

    return { invites, loading, fetchInvites, createInvite, acceptInvite };
};
