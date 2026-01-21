import React from 'react';
import { useLoaderData } from 'react-router';

const UpdateUser = () => {

    const user = useLoaderData();
    console.log(user);

    const handleUpdate = (event) => {
        event.preventDefault();

        const name = event.target.name.value;
        const email = event.target.email.value;
        const updatedUser = { name, email };
        console.log(updatedUser);


        fetch(`http://localhost:3000/update/${user._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedUser),

        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    console.log("After Update", data);

                }

            })

    }
    return (
        <div>
            <form onSubmit={handleUpdate}>
                <input type="text" name="name" defaultValue={user.name} />
                <br />
                <input type="email" name="email" defaultValue={user.email} />
                <br />
                <input type="submit" name="" value={'Update User'} />
            </form>
        </div>
    );
};

export default UpdateUser;