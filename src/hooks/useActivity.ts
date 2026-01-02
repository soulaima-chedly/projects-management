"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

// Type for a single log
export interface AuditLog {
    id: string;
    org_id: string;
    user_id: string;
    action: string;
    entity_type?: string;
    entity_id?: string;
    metadata?: Record<string, any>;
    created_at: string;
}

// Hook to fetch activity logs
export const useActivity = (orgId: string) => {
    const [logs, setLogs] = useState<AuditLog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLogs = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from("audit_logs")
                .select("*")
                .eq("org_id", orgId)
                .order("created_at", { ascending: false })
                .limit(20);

            if (error) {
                console.error("Failed to fetch activity logs:", error);
            } else {
                setLogs(data as AuditLog[]);
            }
            setLoading(false);
        };

        fetchLogs();
    }, [orgId]);

    return { logs, loading };
};

// Function to log an activity (you can use this anywhere in your app)
export const logActivity = async ({
    orgId,
    userId,
    action,
    entityType,
    entityId,
    metadata,
}: {
    orgId: string;
    userId: string;
    action: string;
    entityType?: string;
    entityId?: string;
    metadata?: Record<string, any>;
}) => {
    const { error } = await supabase.from("audit_logs").insert([
        {
            org_id: orgId,
            user_id: userId,
            action,
            entity_type: entityType,
            entity_id: entityId,
            metadata,
        },
    ]);

    if (error) console.error("Failed to log activity:", error);
};
