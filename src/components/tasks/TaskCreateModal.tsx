
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { TaskForm } from './TaskForm';

type TaskCreateModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const TaskCreateModal = ({ open, onOpenChange }: TaskCreateModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
        </DialogHeader>
        <TaskForm onSuccess={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
};
