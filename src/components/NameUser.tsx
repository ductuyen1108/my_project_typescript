import React from 'react';
import { Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { getUserById } from '../apis/users.api';

interface Props {
    userId: number;
}

const NameUser: React.FC<Props> = ({ userId }) => {
    const { data } = useQuery({
        queryKey: ['user'],
        queryFn: () => getUserById(userId),
    });

    return (
        <Typography sx={{ textTransform: 'capitalize' }}>
            {data?.data.name.firstname} {data?.data.name.lastname}
        </Typography>
    );
};

export default NameUser;
