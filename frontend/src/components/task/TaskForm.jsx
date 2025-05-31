import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/Dialog'
import { Label } from '@/components/ui/Label'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../../lib/api/apiClient'
import useAuthStore from '../../lib/store/authStore'
import { extractErrorMessages } from '../../util/errorUtils'
import { toast } from 'sonner'
import { Loader } from 'lucide-react'

const TASK_STATUSES = [
    { value: 'pending', label: 'Pending' },
    { value: 'in progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' }
];


const TaskForm = ({ task, open = true, onOpenChange }) => {


    // State for form values
    const [formValues, setFormValues] = useState({
        title: '',
        description: '',
        status: 'pending',
        dueDate: ''
    })
    const [validationError, setValidationError] = useState(null)


    useEffect(() => {

        if (task) {
            setFormValues({
                title: task.title || '',
                description: task.description || '',
                status: task.status || 'pending',
                dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : ''
            });
        } else {
            setFormValues({
                title: '',
                description: '',
                status: 'pending',
                dueDate: ''
            });
        }
        setValidationError(null);

    }, [task, open])


    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormValues({
            ...formValues,
            [name]: value
        })
    }


    const handleStatusChange = (value) => {

        setFormValues({
            ...formValues,
            status: value
        })

    }


    const handleCancel = () => {
        onOpenChange?.(false)
    }

    const queryClient = useQueryClient()


    // create task mutation

    const createTaskMutation = useMutation({
        mutationFn: async (taskData) => {
            const response = await api.post('/tasks', taskData);
            return response.data;
        },
        onSuccess: (data) => {
            console.log("Task created successfully:", data);
            toast.success('Task created successfully', { description: 'Your task has been created.' });
            queryClient.invalidateQueries(['tasks']);
            onOpenChange?.(false);
            setFormValues({
                title: '',
                description: '',
                status: 'pending',
                dueDate: ''
            });
        },
        onError: (error) => {
            console.error("Error creating task:", error);
            toast.error(`Error creating task: ${extractErrorMessages(error)}`, { description: 'Please try again.' });
            setValidationError(extractErrorMessages(error));
        }
    })

    const updateTaskMutation = useMutation({
        mutationFn: async (taskData) => {
            const response = await api.put(`/tasks/${task._id}`, taskData);
            return response.data;
        },
        onSuccess: (data) => {

            toast.success('Task updated successfully', { description: 'Your task has been updated.' });
            queryClient.invalidateQueries(['tasks']);
            onOpenChange?.(false);
            setFormValues({
                title: '',
                description: '',
                status: 'pending',
                dueDate: ''
            });
            console.log("Task updated successfully:", data);
        }
        ,
        onError: (error) => {
            console.error("Error updating task:", error);
            toast.error(`Error updating task: ${extractErrorMessages(error)}`, { description: 'Please try again.' });
            setValidationError(extractErrorMessages(error));
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formValues.title) {
            setValidationError('Title is required');
            return;
        }

        const taskData = {
            title: formValues.title.trim(),
            description: formValues.description.trim() || '',
            status: formValues.status,
            dueDate: formValues.dueDate ? new Date(formValues.dueDate).toISOString() : null
        }
        if (task) {
            updateTaskMutation.mutate(taskData);
        } else {
            createTaskMutation.mutate(taskData);
        }

    }


    // Get display error from validation or mutation errors
    const displayError = validationError ||
        extractErrorMessages(createTaskMutation.error);

    const isLoading = createTaskMutation.isPending || updateTaskMutation.isPending;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="text-lg font-semibold">
                        Create New Task
                    </DialogTitle>
                    <DialogDescription className="text-sm text-muted-foreground">
                        Fill in the details below to create a new task.
                    </DialogDescription>
                </DialogHeader>

                {/* inputs */}

                <form onSubmit={handleSubmit} className="space-y-6">

                    {displayError && (
                        <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-md">
                            {displayError}
                        </div>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="title">Title *</Label>
                        <Input
                            id="title"
                            name="title"
                            type="text"
                            value={formValues.title}
                            onChange={handleInputChange}
                            placeholder="Enter task title"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="title">Description</Label>
                        <Textarea
                            id="description"
                            name="description"
                            type="text"
                            value={formValues.description}
                            onChange={handleInputChange}
                            placeholder="Enter task description"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Select
                            value={formValues.status}
                            onValueChange={handleStatusChange}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Theme" />
                            </SelectTrigger>
                            <SelectContent>
                                {TASK_STATUSES.map((status) => (
                                    <SelectItem key={status.value} value={status.value}>
                                        {status.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>


                    <div className="space-y-2">
                        <Label htmlFor="dueDate">Due Date</Label>
                        <Input
                            id="dueDate"
                            name="dueDate"
                            type="date"
                            value={formValues.dueDate}
                            onChange={handleInputChange}
                        />
                    </div>

                    <DialogFooter className="flex justify-end space-x-2">

                        <Button type="button" variant="outline" onClick={handleCancel}>
                            Cancel
                        </Button>


                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? (
                                <span className="flex items-center gap-2">
                                    <Loader size="sm" />
                                    {task ? 'Updating...' : 'Creating...'}
                                </span>
                            ) : (
                                task ? 'Update Task' : 'Create Task'
                            )}
                        </Button>

                    </DialogFooter>

                </form>
            </DialogContent>
        </Dialog>
    )
}

export default TaskForm