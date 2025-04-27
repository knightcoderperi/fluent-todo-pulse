
import { createContext, useContext, useReducer, ReactNode } from 'react';
import { toast } from 'sonner';

export type Task = {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in-progress' | 'completed';
  createdAt: Date;
  userId: string;
};

type TaskState = {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
};

type TaskAction =
  | { type: 'SET_TASKS'; payload: Task[] }
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'UPDATE_TASK'; payload: Task }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

type TaskContextType = {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  getTasks: () => Promise<void>;
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'userId'>) => Promise<void>;
  updateTask: (id: string, task: Partial<Omit<Task, 'id' | 'userId'>>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
};

const initialState: TaskState = {
  tasks: [],
  isLoading: false,
  error: null,
};

// Sample mock data
const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Complete Project Proposal',
    description: 'Draft and finalize the project proposal document',
    priority: 'high',
    status: 'todo',
    createdAt: new Date(2023, 5, 15),
    userId: '1'
  },
  {
    id: '2',
    title: 'Design User Interface',
    description: 'Create wireframes and mockups for the application',
    priority: 'medium',
    status: 'in-progress',
    createdAt: new Date(2023, 5, 20),
    userId: '1'
  },
  {
    id: '3',
    title: 'Schedule Team Meeting',
    description: 'Set up a meeting to discuss project roadmap',
    priority: 'low',
    status: 'completed',
    createdAt: new Date(2023, 5, 25),
    userId: '1'
  }
];

const taskReducer = (state: TaskState, action: TaskAction): TaskState => {
  switch (action.type) {
    case 'SET_TASKS':
      return { ...state, tasks: action.payload };
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.payload] };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task => 
          task.id === action.payload.id ? action.payload : task
        ),
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
      };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  // Mock API calls for now
  const getTasks = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      // Mock API call delay
      await new Promise(resolve => setTimeout(resolve, 700));
      dispatch({ type: 'SET_TASKS', payload: mockTasks });
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: 'Failed to fetch tasks: ' + (error instanceof Error ? error.message : 'Unknown error') 
      });
      toast.error('Failed to fetch tasks');
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const addTask = async (task: Omit<Task, 'id' | 'createdAt' | 'userId'>) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      // Mock API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newTask: Task = {
        ...task,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date(),
        userId: '1' // Mock user ID
      };
      
      dispatch({ type: 'ADD_TASK', payload: newTask });
      toast.success('Task added successfully!');
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: 'Failed to add task: ' + (error instanceof Error ? error.message : 'Unknown error') 
      });
      toast.error('Failed to add task');
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const updateTask = async (id: string, taskUpdate: Partial<Omit<Task, 'id' | 'userId'>>) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      // Mock API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const taskToUpdate = state.tasks.find(task => task.id === id);
      if (!taskToUpdate) {
        throw new Error('Task not found');
      }
      
      const updatedTask: Task = {
        ...taskToUpdate,
        ...taskUpdate
      };
      
      dispatch({ type: 'UPDATE_TASK', payload: updatedTask });
      toast.success('Task updated successfully!');
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: 'Failed to update task: ' + (error instanceof Error ? error.message : 'Unknown error') 
      });
      toast.error('Failed to update task');
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const deleteTask = async (id: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      // Mock API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      dispatch({ type: 'DELETE_TASK', payload: id });
      toast.success('Task deleted successfully!');
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: 'Failed to delete task: ' + (error instanceof Error ? error.message : 'Unknown error') 
      });
      toast.error('Failed to delete task');
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks: state.tasks,
        isLoading: state.isLoading,
        error: state.error,
        getTasks,
        addTask,
        updateTask,
        deleteTask
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
