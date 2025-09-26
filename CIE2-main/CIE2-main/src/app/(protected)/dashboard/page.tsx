import { UserTable } from "@/components/dashboard/UserTable";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Dashboard | UserDash',
    description: 'View and manage registered users.',
};

export default function DashboardPage() {
    return (
        <div className="container mx-auto">
            <h1 className="mb-6 text-3xl font-bold tracking-tight text-primary">
                User Management Dashboard
            </h1>
            <Suspense fallback={<Skeleton className="h-[300px] w-full rounded-md" />}>
                <UserTable />
            </Suspense>
        </div>
    );
}
