import TaskList from "../components/tasks/TaskList";

const Dashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">Tableau de bord</h1>
      <TaskList />
    </div>
  );
};

export default Dashboard;