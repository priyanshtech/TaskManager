'use client';

import { useState } from 'react';

type TaskFormProps = {
    selectedDate: Date;
    onSubmit: (task: {
        title: string;
        description: string;
        date: string;
        priority: string;
    }) => void;
    onCancel: () => void;
};

export default function TaskForm({ selectedDate, onSubmit, onCancel }: TaskFormProps) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('medium');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim()) {
            alert('Please enter a task title');
            return;
        }

        // Create ISO date string for the selected date
        const dateStr = selectedDate.toISOString();

        onSubmit({
            title: title.trim(),
            description: description.trim(),
            date: dateStr,
            priority
        });

        // Reset form
        setTitle('');
        setDescription('');
        setPriority('medium');
    };

    return (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-card rounded-lg shadow-xl max-w-md w-full p-6">
                <h2 className="text-2xl font-bold mb-4 text-card-foreground">Add New Task</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Title Input */}
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-foreground mb-1">
                            Task Title *
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-background text-foreground"
                            placeholder="e.g., Buy groceries"
                            required
                        />
                    </div>

                    {/* Description Input */}
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-foreground mb-1">
                            Description (Optional)
                        </label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-background text-foreground"
                            placeholder="Add more details..."
                            rows={3}
                        />
                    </div>

                    {/* Priority Select */}
                    <div>
                        <label htmlFor="priority" className="block text-sm font-medium text-foreground mb-1">
                            Priority
                        </label>
                        <select
                            id="priority"
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-background text-foreground"
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>

                    {/* Date Display */}
                    <div className="bg-muted p-3 rounded-md">
                        <p className="text-sm text-muted-foreground">
                            <span className="font-medium">Date:</span>{' '}
                            {selectedDate.toLocaleDateString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </p>
                    </div>
                    {/* Buttons */}
                    <div className="flex gap-3 pt-2">
                        <button
                            type="submit"
                            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
                        >
                            Add Task
                        </button>
                        <button
                            type="button"
                            onClick={onCancel}
                            className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors font-medium"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
