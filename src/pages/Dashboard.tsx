
import { useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { TaskList } from '@/components/tasks/TaskList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTask } from '@/contexts/TaskContext';

export const Dashboard = () => {
  const { tasks } = useTask();
  
  const todoCount = tasks.filter(task => task.status === 'todo').length;
  const inProgressCount = tasks.filter(task => task.status === 'in-progress').length;
  const completedCount = tasks.filter(task => task.status === 'completed').length;
  
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your tasks and track your progress
          </p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="animate-fade-in">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                To Do
              </CardTitle>
              <div className="h-4 w-4 rounded-full bg-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{todoCount}</div>
              <p className="text-xs text-muted-foreground">
                Tasks waiting to be started
              </p>
            </CardContent>
          </Card>
          <Card className="animate-fade-in" style={{ animationDelay: '100ms' }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                In Progress
              </CardTitle>
              <div className="h-4 w-4 rounded-full bg-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inProgressCount}</div>
              <p className="text-xs text-muted-foreground">
                Tasks currently being worked on
              </p>
            </CardContent>
          </Card>
          <Card className="animate-fade-in" style={{ animationDelay: '200ms' }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Completed
              </CardTitle>
              <div className="h-4 w-4 rounded-full bg-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedCount}</div>
              <p className="text-xs text-muted-foreground">
                Tasks successfully completed
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="all-tasks">
          <TabsList>
            <TabsTrigger value="all-tasks">All Tasks</TabsTrigger>
            <TabsTrigger value="my-tasks">My Tasks</TabsTrigger>
          </TabsList>
          <TabsContent value="all-tasks" className="mt-4">
            <TaskList />
          </TabsContent>
          <TabsContent value="my-tasks" className="mt-4">
            <TaskList />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};
