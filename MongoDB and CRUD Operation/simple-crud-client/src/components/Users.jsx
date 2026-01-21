import React, { use, useState } from 'react';
import { Link } from 'react-router';

const Users = ({ userPromise }) => {
    const initialUsers = use(userPromise)
    console.log(initialUsers);
    const [users, setUsers] = useState(initialUsers)

    // console.log(users);


    const handleUser = (event) => {
        event.preventDefault();

        const name = event.target.name.value;
        const email = event.target.email.value;

        const user = { name, email }

        console.log(user);


        fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
            // …
        })
            .then(res => res.json())
            .then(data => {
                console.log("Data after creating user in the db", data);

                if (data.insertedId) {
                    user._id = data.insertedId;
                    const newUser = [...users, user];
                    setUsers(newUser)

                    alert('User Added Successfully');
                    event.target.reset();
                }


            })
            .catch(error => {
                console.error("Fetch error:", error);
            });
    };




    const handleDelete = (id) => {
        console.log(id);
        fetch(`http://localhost:3000/users/${id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount) {
                    const remainingUsers = users.filter(user => user._id !== id);
                    setUsers(remainingUsers);

                    console.log("After Delete", data);
                }

            })
    }


    return (
        <div>

            <form onSubmit={handleUser}>
                <input type="text" name="name" />
                <br />
                <input type="email" name="email" />
                <br />
                <input type="submit" name="" value={'Add User'} />
            </form>

            <div>
                {
                    users.map(user => <p key={user._id}>{user.name} : {user.email}
                        <Link to={`/users/${user._id}`}>Details</Link>
                        <Link to={`/update/${user._id}`}>Edit</Link>
                        <button onClick={() => handleDelete(user._id)}>x</button></p>)
                }
            </div>
        </div>
    );
};

export default Users;