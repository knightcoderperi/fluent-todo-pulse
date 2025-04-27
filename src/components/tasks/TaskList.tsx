
import { useEffect, useState } from 'react';
import { Task, useTask } from '@/contexts/TaskContext';
import { TaskCard } from './TaskCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { TaskCreateModal } from './TaskCreateModal';
import { Plus } from 'lucide-react';

type FilterOptions = {
  status: string;
  priority: string;
  search: string;
};

export const TaskList = () => {
  const { tasks, isLoading, getTasks } = useTask();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    status: 'all',
    priority: 'all',
    search: '',
  });
  
  useEffect(() => {
    getTasks();
  }, []);

  const filteredTasks = tasks.filter((task) => {
    // Filter by status
    if (filters.status !== 'all' && task.status !== filters.status) {
      return false;
    }
    
    // Filter by priority
    if (filters.priority !== 'all' && task.priority !== filters.priority) {
      return false;
    }
    
    // Filter by search term
    if (filters.search && !task.title.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    
    return true;
  });
  
  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };
  
  return (
    <div className="space-y-4">
      {/* Filters and Add Task button */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex-1 flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <Label htmlFor="search" className="sr-only">Search tasks</Label>
            <Input
              id="search"
              placeholder="Search tasks..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
            />
          </div>
          <div className="flex gap-3">
            <div className="w-40">
              <Label htmlFor="status-filter" className="sr-only">Filter by status</Label>
              <Select
                value={filters.status}
                onValueChange={(value) => handleFilterChange('status', value)}
              >
                <SelectTrigger id="status-filter">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="todo">To Do</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-40">
              <Label htmlFor="priority-filter" className="sr-only">Filter by priority</Label>
              <Select
                value={filters.priority}
                onValueChange={(value) => handleFilterChange('priority', value)}
              >
                <SelectTrigger id="priority-filter">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <Button
          onClick={() => setIsCreateModalOpen(true)}
          className="whitespace-nowrap"
        >
          <Plus className="h-5 w-5 mr-2" /> Add Task
        </Button>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center py-10">
          <div className="animate-pulse flex space-x-4">
            <div className="h-6 w-6 bg-primary/20 rounded-full" />
            <div className="space-y-2">
              <div className="h-3 w-28 bg-primary/20 rounded" />
              <div className="h-2 w-20 bg-primary/10 rounded" />
            </div>
          </div>
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className="text-center py-10 bg-card rounded-lg border">
          <h3 className="text-lg font-medium">No tasks found</h3>
          <p className="text-muted-foreground mt-1">
            {tasks.length === 0 
              ? "You don't have any tasks yet. Add one to get started!" 
              : "No tasks match your current filters."}
          </p>
          {tasks.length > 0 && (
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => setFilters({ status: 'all', priority: 'all', search: '' })}
            >
              Clear filters
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
      
      <TaskCreateModal 
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
      />
    </div>
  );
};
