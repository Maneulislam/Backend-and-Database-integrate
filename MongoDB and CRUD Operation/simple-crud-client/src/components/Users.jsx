import React, { use, useState } from 'react';

const Users = ({ userPromise }) => {
    // const initialUsers = use(userPromise)
    // const [users, setUsers] = useState(initialUsers)

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

                // const newUser = [...users, data];

                // setUsers(newUser);

                // event.target.reset();

            })
            .catch(error => {
                console.error("Fetch error:", error);
            });
    };


    return (
        <div>

            <form onSubmit={handleUser}>
                <input type="text" name="name" />
                <br />
                <input type="email" name="email" />
                <br />
                <input type="submit" name="" value={'Add User'} />
            </form>

            {/* <div>
                {
                    users.map(user => <p key={user.id}>{user.name} : {user.email}</p>)
                }
            </div> */}
        </div>
    );
};

export default Users;