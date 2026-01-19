'use client';

import { useState, useEffect } from 'react';
import TaskCalendar from '@/components/TaskCalendar';
import TaskList from '@/components/TaskList';
import TaskForm from '@/components/TaskForm';

type Task = {
    id: string;
    title: string;
    description?: string | null;
    date: string;
    completed: boolean;
    priority: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
};

type DashboardClientProps = {
    user: any;
};

export default function DashboardClient({ user }: DashboardClientProps) {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
    const [showTaskForm, setShowTaskForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch all tasks on mount
    useEffect(() => {
        fetchTasks();
    }, []);

    // Filter tasks when selected date or tasks change
    useEffect(() => {
        filterTasksByDate(selectedDate);
    }, [selectedDate, tasks]);

    // Fetch tasks from API
    const fetchTasks = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch('/api/tasks');
            const data = await response.json();

            if (response.ok) {
                setTasks(data.tasks);
            } else {
                setError(data.error || 'Failed to fetch tasks');
                console.error('Failed to fetch tasks:', data.error);
            }
        } catch (error) {
            setError('Error fetching tasks');
            console.error('Error fetching tasks:', error);
        } finally {
            setLoading(false);
        }
    };

    // Filter tasks by selected date
    const filterTasksByDate = (date: Date) => {
        const dateStr = date.toISOString().split('T')[0];
        const filtered = tasks.filter(task => {
            const taskDate = new Date(task.date).toISOString().split('T')[0];
            return taskDate === dateStr;
        });
        setFilteredTasks(filtered);
    };

    // Handle date selection from calendar
    const handleDateSelect = (date: Date) => {
        setSelectedDate(date);
    };

    // Handle task toggle (mark complete/incomplete)
    const handleToggleTask = async (id: string, completed: boolean) => {
        try {
            const response = await fetch(`/api/tasks/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ completed })
            });

            if (response.ok) {
                await fetchTasks(); // Refresh tasks
            } else {
                const data = await response.json();
                alert(data.error || 'Failed to update task');
            }
        } catch (error) {
            console.error('Error toggling task:', error);
            alert('Error updating task');
        }
    };

    // Handle task deletion
    const handleDeleteTask = async (id: string) => {
        console.log('Delete button clicked for task:', id);

        if (!confirm('Are you sure you want to delete this task?')) {
            console.log('Delete cancelled by user');
            return;
        }

        console.log('Deleting task:', id);
        try {
            const response = await fetch(`/api/tasks/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                console.log('Task deleted successfully');
                await fetchTasks(); // Refresh tasks
            } else {
                const data = await response.json();
                alert(data.error || 'Failed to delete task');
            }
        } catch (error) {
            console.error('Error deleting task:', error);
            alert('Error deleting task');
        }
    };

    // Handle new task creation
    const handleCreateTask = async (taskData: {
        title: string;
        description: string;
        date: string;
        priority: string;
    }) => {
        try {
            const response = await fetch('/api/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(taskData)
            });

            if (response.ok) {
                await fetchTasks(); // Refresh tasks
                setShowTaskForm(false); // Close form - THIS FIXES THE UI ISSUE
            } else {
                const data = await response.json();
                alert(data.error || 'Failed to create task');
            }
        } catch (error) {
            console.error('Error creating task:', error);
            alert('Error creating task');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">My Task Manager</h1>
                            <p className="text-sm text-gray-600">Welcome, {user?.name || user?.email}</p>
                        </div>
                        <a href="/auth/logout" className="border-1 px-2 rounded-md hover:scale-108 transition-all duration-300">Logout</a>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                {error && (
                    <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                        {error}
                    </div>
                )}

                {loading ? (
                    <div className="text-center py-12">
                        <p className="text-gray-600">Loading tasks...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Calendar Section */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-lg font-semibold mb-4">Calendar</h2>
                            <TaskCalendar tasks={tasks} onDateSelect={handleDateSelect} />
                        </div>

                        {/* Tasks Section */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-semibold">Tasks</h2>
                                <button
                                    onClick={() => setShowTaskForm(true)}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                                >
                                    + Add Task
                                </button>
                            </div>

                            <TaskList
                                tasks={filteredTasks}
                                selectedDate={selectedDate}
                                onToggle={handleToggleTask}
                                onDelete={handleDeleteTask}
                            />
                        </div>
                    </div>
                )}

                {/* Task Statistics */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg shadow p-4">
                        <p className="text-sm text-gray-600">Total Tasks</p>
                        <p className="text-2xl font-bold text-gray-900">{tasks.length}</p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-4">
                        <p className="text-sm text-gray-600">Completed</p>
                        <p className="text-2xl font-bold text-green-600">
                            {tasks.filter(t => t.completed).length}
                        </p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-4">
                        <p className="text-sm text-gray-600">Pending</p>
                        <p className="text-2xl font-bold text-orange-600">
                            {tasks.filter(t => !t.completed).length}
                        </p>
                    </div>
                </div>
            </main>

            {/* Task Form Modal */}
            {showTaskForm && (
                <TaskForm
                    selectedDate={selectedDate}
                    onSubmit={handleCreateTask}
                    onCancel={() => setShowTaskForm(false)}
                />
            )}
        </div>
    );
}
