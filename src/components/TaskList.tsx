'use client';

import { useState } from 'react';

type Task = {
    id: string;
    title: string;
    description?: string | null;
    date: string;
    completed: boolean;
    priority: string;
};

type TaskListProps = {
    tasks: Task[];
    selectedDate: Date;
    onToggle: (id: string, completed: boolean) => void;
    onDelete: (id: string) => void;
};

export default function TaskList({ tasks, selectedDate, onToggle, onDelete }: TaskListProps) {
    const dateStr = selectedDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Get priority color
    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high':
                return 'bg-red-100 text-red-800 border-red-200';
            case 'medium':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'low':
                return 'bg-green-100 text-green-800 border-green-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    return (
        <div className="task-list-container">
            <h2 className="text-xl font-bold mb-4">{dateStr}</h2>

            {tasks.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    <p>No tasks for this date</p>
                    <p className="text-sm mt-2">Click "Add Task" to create one</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {tasks.map(task => (
                        <div
                            key={task.id}
                            className={`task-item border rounded-lg p-4 transition-all ${task.completed ? 'bg-gray-50 opacity-75' : 'bg-white'
                                }`}
                        >
                            <div className="flex items-start gap-3">
                                {/* Checkbox */}
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => onToggle(task.id, !task.completed)}
                                    className="mt-1 w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                />

                                {/* Task Content */}
                                <div className="flex-1">
                                    <h3
                                        className={`font-semibold ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'
                                            }`}
                                    >
                                        {task.title}
                                    </h3>

                                    {task.description && (
                                        <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                                    )}

                                    {/* Priority Badge */}
                                    <span
                                        className={`inline-block mt-2 px-2 py-1 text-xs font-medium rounded border ${getPriorityColor(
                                            task.priority
                                        )}`}
                                    >
                                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                                    </span>
                                </div>

                                {/* Delete Button */}
                                <button
                                    onClick={() => onDelete(task.id)}
                                    className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded transition-colors"
                                    title="Delete task"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
