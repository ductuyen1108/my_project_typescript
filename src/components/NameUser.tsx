import React from 'react';
import { Typography } from '@mui/material';
import { useState, useEffect } from 'react';

interface Props {
    userId: number;
}

interface User {
    name: {
        firstname: string;
        lastname: string;
    };
}

const NameUser: React.FC<Props> = ({ userId }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        fetch(`https://fakestoreapi.com/users/${userId}`)
            .then((res) => res.json())
            .then((data: User) => {
                setUser(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [userId]);

    return (
        <Typography sx={{ textTransform: 'capitalize' }}>
            {user?.name.firstname} {user?.name.lastname}
        </Typography>
    );
};

export default NameUser;
