import React, { useState, useRef } from 'react';
import { Alert, Box, Button, List, ListItem, TextField, Typography, Paper } from '@mui/material';
import { Delete, Edit, Save, Cancel } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, deleteTodo, editTodo } from '../../slice/todoListSlice';
import { todoListSelector } from '../../redux/selectors';

interface Todo {
    id: string;
    job: string;
}

const TodoList: React.FC = () => {
    const [work, setWork] = useState<string>('');
    //const [todos, setTodos] = useState<Todo[]>([]);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [editingTodoId, setEditingTodoId] = useState<string | null>(null);
    const [editedTodo, setEditedTodo] = useState<string>('');

    const inputRef = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch();

    const todos = useSelector(todoListSelector);
    console.log(todos);

    /* useEffect(() => {
        const storedTodos = localStorage.getItem('todos');
        if (storedTodos) {
            setTodos(JSON.parse(storedTodos));
        }
    }, []); */

    /* useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]); */

    /* const handleAdd = () => {
        if (todos.some((todo) => todo.id === work.replace(/\s/g, ''))) {
            setShowAlert(true);
        } else {
            setTodos((prev) => [...prev, { id: work.replace(/\s/g, ''), job: work }]);
            setWork('');
            if (inputRef.current) {
                inputRef.current.focus();
            }
            setShowAlert(false);
        }
    }; */

    const handleAdd = () => {
        const id = work.replace(/\s/g, '');
        if (todos.some((todo) => todo.id === work.replace(/\s/g, ''))) {
            setShowAlert(true);
        } else {
            dispatch(addTodo({ id: id, job: work }));
            setWork('');
            if (inputRef.current) {
                inputRef.current.focus();
            }
            setShowAlert(false);
        }
    };

    /* const handleDelete = (id: string) => {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
    }; */

    const handleDelete = (id: string) => {
        dispatch(deleteTodo(id));
    };

    const handleEdit = (id: string, job: string) => {
        setEditingTodoId(id);
        setEditedTodo(job);
    };

    const handleSave = () => {
        /* setTodos((prevTodos) =>
            prevTodos.map((todo) => {
                if (todo.id === editingTodoId) {
                    return { ...todo, job: editedTodo };
                }
                return todo;
            }),
        ); */
        dispatch(editTodo({ id: editingTodoId!, job: editedTodo }));
        setEditingTodoId(null);
    };

    const handleCancelEdit = () => {
        setEditingTodoId(null);
        setEditedTodo('');
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                backgroundColor: '#f5f5f5',
            }}
        >
            <Paper
                sx={{
                    width: '800px',
                    height: '600px',
                    mt: '30px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Box sx={{ width: '600px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography sx={{ marginBottom: '10px', marginTop: '10px', fontSize: '35px' }}>
                        Todo List
                    </Typography>
                    <Box>
                        <Box
                            sx={{
                                display: 'flex',
                                gap: '35px',
                                height: '40px',
                                alignItems: 'center',
                                marginBottom: '20px',
                            }}
                        >
                            <TextField
                                //label="Enter todo"
                                placeholder="Enter todo"
                                variant="standard"
                                value={work}
                                ref={inputRef}
                                fullWidth
                                required
                                onChange={(e) => setWork(e.target.value)}
                            />
                            <Button variant="contained" sx={{ width: '150px' }} onClick={handleAdd}>
                                Add
                            </Button>
                        </Box>
                        <Box>
                            <List sx={{ width: '500px' }}>
                                {todos.map((todo) => (
                                    <ListItem
                                        key={todo.id}
                                        sx={{
                                            display: 'flex',
                                            width: '100%',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Typography sx={{ width: '220px' }}>
                                            {editingTodoId === todo.id ? (
                                                <TextField
                                                    value={editedTodo}
                                                    onChange={(e) => setEditedTodo(e.target.value)}
                                                    fullWidth
                                                    required
                                                    autoFocus
                                                />
                                            ) : (
                                                todo.job
                                            )}
                                        </Typography>
                                        {editingTodoId === todo.id ? (
                                            <Box display={'flex'} gap={2}>
                                                <Button
                                                    variant="outlined"
                                                    startIcon={<Save />}
                                                    onClick={handleSave}
                                                    disabled={!editedTodo.trim()}
                                                >
                                                    Save
                                                </Button>
                                                <Button
                                                    variant="outlined"
                                                    startIcon={<Cancel />}
                                                    onClick={handleCancelEdit}
                                                >
                                                    Cancel
                                                </Button>
                                            </Box>
                                        ) : (
                                            <Box display={'flex'} gap={2}>
                                                <Button
                                                    variant="outlined"
                                                    startIcon={<Edit />}
                                                    onClick={() => handleEdit(todo.id, todo.job)}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    variant="outlined"
                                                    startIcon={<Delete />}
                                                    onClick={() => handleDelete(todo.id)}
                                                >
                                                    Delete
                                                </Button>
                                            </Box>
                                        )}
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    </Box>
                    {showAlert && <Alert severity="error">Công việc đã thêm vào trước đó!</Alert>}
                </Box>
            </Paper>
        </Box>
    );
};

export default TodoList;
