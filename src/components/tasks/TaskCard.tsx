
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Pencil, Trash2, Check } from 'lucide-react';
import { Task, useTask } from '@/contexts/TaskContext';
import { TaskEditModal } from './TaskEditModal';

type TaskCardProps = {
  task: Task;
};

export const TaskCard = ({ task }: TaskCardProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { updateTask, deleteTask } = useTask();

  const priorityMap = {
    low: { color: 'bg-priority-low text-white', label: 'Low' },
    medium: { color: 'bg-priority-medium text-white', label: 'Medium' },
    high: { color: 'bg-priority-high text-white', label: 'High' },
  };

  const statusMap = {
    'todo': { color: 'bg-blue-500 text-white', label: 'To Do' },
    'in-progress': { color: 'bg-amber-500 text-white', label: 'In Progress' },
    'completed': { color: 'bg-green-600 text-white', label: 'Completed' },
  };

  const handleStatusChange = async () => {
    const newStatus = task.status === 'completed' ? 'todo' : 
                     task.status === 'todo' ? 'in-progress' : 'completed';
    await updateTask(task.id, { status: newStatus });
  };

  const handleDelete = async () => {
    await deleteTask(task.id);
  };

  return (
    <>
      <Card className="task-card animate-fade-in hover:-translate-y-1 transition-transform">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg font-semibold line-clamp-2">{task.title}</CardTitle>
            <div className="flex gap-1">
              <Badge className={priorityMap[task.priority].color}>
                {priorityMap[task.priority].label}
              </Badge>
            </div>
          </div>
          <CardDescription className="text-sm text-muted-foreground">
            {new Date(task.createdAt).toLocaleDateString()}
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-2">
          <p className="text-sm line-clamp-3">{task.description}</p>
        </CardContent>
        <CardFooter className="pt-2 flex justify-between">
          <Badge variant="outline" className={`${statusMap[task.status].color}`}>
            {statusMap[task.status].label}
          </Badge>
          <div className="flex gap-2">
            <Button 
              size="icon" 
              variant="ghost"
              onClick={handleStatusChange}
              title={task.status === 'completed' ? "Mark as To Do" : "Mark as Complete"}
            >
              <Check className="h-4 w-4" />
            </Button>
            <Button 
              size="icon" 
              variant="ghost"
              onClick={() => setIsEditModalOpen(true)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button 
              size="icon" 
              variant="ghost" 
              className="text-destructive hover:bg-destructive/10"
              onClick={handleDelete}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
      
      {isEditModalOpen && (
        <TaskEditModal
          task={task}
          open={isEditModalOpen}
          onOpenChange={setIsEditModalOpen}
        />
      )}
    </>
  );
};
