import React from 'react';
import { useLoaderData } from 'react-router';

const UserDetail = () => {

    const detail = useLoaderData();
    console.log(detail);

    return (
        <div>
            Details
        </div>
    );
};

export default UserDetail;