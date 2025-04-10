import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import TaskList from '../components/tasks/TaskList';

export default function Dashboard() {
    const { user } = useAuth();

    useEffect(() => {
        document.title = 'Dashboard - Task Manager';
    }, []);

    return (
        <div>
            <div className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Welcome back, {user?.name}! Here are your tasks.
                    </p>
                </div>
            </div>
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <TaskList />
            </div>
        </div>
    );
}