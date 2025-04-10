

import { useState } from 'react';
import axios from 'axios';

export default function TaskItem({ task, onTaskUpdated, onTaskDeleted }) {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [category, setCategory] = useState(task.category || '');

    const toggleComplete = async () => {
        try {
            const { data } = await axios.patch(`/tasks/${task.id}/toggle`);
            onTaskUpdated(data);
        } catch (error) {
            console.error('Error toggling task:', error);
        }
    };

    const handleUpdate = async () => {
        try {
            const { data } = await axios.put(`/tasks/${task.id}`, {
                title,
                description,
                category
            });
            onTaskUpdated(data);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`/tasks/${task.id}`);
            onTaskDeleted(task.id);
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    return (
        <div className={`p-4 border rounded-lg ${task.completed ? 'bg-gray-50' : 'bg-white'}`}>
            {isEditing ? (
                <div className="space-y-3">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg"
                    />
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg"
                        rows="3"
                    />
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg"
                        placeholder="Category (optional)"
                    />
                    <div className="flex justify-end space-x-2">
                        <button
                            onClick={() => setIsEditing(false)}
                            className="px-3 py-1 text-gray-600 hover:text-gray-800"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleUpdate}
                            className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        >
                            Save
                        </button>
                    </div>
                </div>
            ) : (
                <div className="space-y-2">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={toggleComplete}
                                className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-2"
                            />
                            <h3 className={`text-lg font-medium ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                                {task.title}
                            </h3>
                        </div>
                        {task.category && (
                            <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                                {task.category}
                            </span>
                        )}
                    </div>
                    {task.description && (
                        <p className={`text-gray-600 ${task.completed ? 'line-through' : ''}`}>
                            {task.description}
                        </p>
                    )}
                    <div className="flex justify-end space-x-2 mt-2">
                        <button
                            onClick={() => setIsEditing(true)}
                            className="px-2 py-1 text-sm text-blue-600 hover:text-blue-800"
                        >
                            Edit
                        </button>
                        <button
                            onClick={handleDelete}
                            className="px-2 py-1 text-sm text-red-600 hover:text-red-800"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}