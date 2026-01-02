"use client";

import { useActivity, AuditLog } from "@/hooks/useActivity";

interface ActivityPageProps {
    orgId: string;
}

export default function ActivityPage({ orgId }: ActivityPageProps) {
    const { logs, loading } = useActivity(orgId);

    return (
        <div className="h-full p-6">
            <div className="mx-auto max-w-5xl">
                <h1 className="text-2xl font-semibold mb-4">Activity</h1>

                {loading ? (
                    <p>Loading activity...</p>
                ) : logs.length === 0 ? (
                    <p>No activity yet.</p>
                ) : (
                    <ul className="space-y-3">
                        {logs.map((log: AuditLog) => (
                            <li key={log.id} className="border rounded p-3">
                                <div className="text-sm text-gray-500">
                                    {new Date(log.created_at).toLocaleString()}
                                </div>
                                <div className="font-medium">
                                    {log.user_id} performed <span className="italic">{log.action}</span>
                                </div>
                                {log.metadata && (
                                    <pre className="text-xs text-gray-600 mt-1">
                                        {JSON.stringify(log.metadata, null, 2)}
                                    </pre>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
