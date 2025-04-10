import { useEffect, useState } from 'react';
import axios from 'axios';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';

export default function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('all'); // 'all', 'completed', 'active'
    const [categories, setCategories] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState('all');

    useEffect(() => {
        fetchTasks();
    }, [filter, categoryFilter]);

    const fetchTasks = async () => {
        try {
            const { data } = await axios.get('/tasks');
            let filteredTasks = data;
            
            // Apply status filter
            if (filter === 'completed') {
                filteredTasks = data.filter(task => task.completed);
            } else if (filter === 'active') {
                filteredTasks = data.filter(task => !task.completed);
            }
            
            // Apply category filter
            if (categoryFilter !== 'all') {
                filteredTasks = filteredTasks.filter(task => task.category === categoryFilter);
            }
            
            setTasks(filteredTasks);
            
            // Extract unique categories
            const allCategories = [...new Set(data.map(task => task.category).filter(Boolean))];
            setCategories(allCategories);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const handleTaskCreated = (newTask) => {
        setTasks([newTask, ...tasks]);
    };

    const handleTaskUpdated = (updatedTask) => {
        setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
    };

    const handleTaskDeleted = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">My Tasks</h2>
                <div className="flex space-x-2">
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="px-3 py-1 border rounded-lg"
                    >
                        <option value="all">All</option>
                        <option value="active">Active</option>
                        <option value="completed">Completed</option>
                    </select>
                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="px-3 py-1 border rounded-lg"
                    >
                        <option value="all">All Categories</option>
                        {categories.map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                </div>
            </div>
            
            <TaskForm onTaskCreated={handleTaskCreated} />
            
            <div className="mt-6 space-y-3">
                {tasks.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">No tasks found</p>
                ) : (
                    tasks.map(task => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            onTaskUpdated={handleTaskUpdated}
                            onTaskDeleted={handleTaskDeleted}
                        />
                    ))
                )}
            </div>
        </div>
    );
}