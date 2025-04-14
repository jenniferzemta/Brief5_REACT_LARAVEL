import React from 'react'
import Layout from '../components/Layouts/Layout'
import TaskList from '../components/tasks/TaskList';

function Task() {
  return (
    <div>
      

      <Layout>
        { <TaskList />}
      </Layout>

    </div>
  )
}

export default Task;
