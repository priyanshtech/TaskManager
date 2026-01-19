import { requireAuth, getUser } from '@/lib/auth';
import DashboardClient from '@/components/DashboardClient';

export default async function DashboardPage() {
    const userId = await requireAuth();
    const user = await getUser();

    return <DashboardClient user={user} />;
}
