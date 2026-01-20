'use client';

type DashboardHeaderProps = {
    userName: string;
};

export default function DashboardHeader({ userName }: DashboardHeaderProps) {
    return (
        <header className="bg-card shadow-sm border-b border-border">
            <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-card-foreground">My Task Manager</h1>
                        <p className="text-sm text-muted-foreground">Welcome, {userName}</p>
                    </div>
                    <a href="/auth/logout" className="border-1 px-2 rounded-md hover:scale-108 transition-all duration-300">
                        Logout
                    </a>
                </div>
            </div>
        </header>
    );
}
