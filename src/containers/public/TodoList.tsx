import React from 'react';
import { Alert, Box, Button, List, ListItem, TextField, Typography } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useState, useRef, useEffect } from 'react';

interface Todo {
    id: string;
    job: string;
}

const TodoList: React.FC = () => {
    const [work, setWork] = useState<string>('');
    const [todos, setTodos] = useState<Todo[]>([]);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const storedTodos = localStorage.getItem('todos');
        if (storedTodos) {
            setTodos(JSON.parse(storedTodos));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const handleAdd = () => {
        if (todos.some((todo) => todo.id === work.replace(/\s/g, ''))) {
            setShowAlert(true);
        } else {
            setTodos((prev) => [...prev, { id: work.replace(/\s/g, ''), job: work }]);
            setWork('');
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }
    };

    const handleDelete = (id: string) => {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <Typography sx={{ marginBottom: '10px', marginTop: '10px', fontSize: '35px' }}>Todo List</Typography>
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
                    <TextField label="Enter todo" variant="standard" value={work} ref={inputRef} fullWidth required />
                    <Button variant="contained" sx={{ width: '150px' }} onClick={handleAdd}>
                        Add
                    </Button>
                </Box>
                <Box>
                    <List>
                        {todos.map((todo) => (
                            <ListItem
                                key={todo.id}
                                sx={{ display: 'flex', width: '400px', justifyContent: 'space-between' }}
                            >
                                <Typography>{todo.job}</Typography>
                                <Button variant="outlined" startIcon={<Delete />} onClick={() => handleDelete(todo.id)}>
                                    Delete
                                </Button>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Box>
            {showAlert && <Alert severity="error">Công việc đã thêm vào trước đó!</Alert>}
        </Box>
    );
};

export default TodoList;
