import React from "react";
import { Task, TaskAction } from "../reducers/taskListReducer";

interface TasksContextType {
  tasks: Task[];
  dispatch: React.Dispatch<TaskAction>;
}

const TasksContext = React.createContext<TasksContextType>(
  {} as TasksContextType
);

export default TasksContext;

/**
 * TasksContext
 *
 * Context for storing the tasks and the dispatch function
 * to update the tasks in the taskListReducer
 *
 * @example
 * import TasksContext from '../state-management/context/tasksContext'
 *
 * const value = React.useContext(TasksContext)
 * const { tasks, dispatch } = value
 */
