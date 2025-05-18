import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { userService } from "../services/api";
import '../styles/UsersList.css';

function UsersList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        userService.getAllUsers().then(res => setUsers(res.data));
    }, []);

    useEffect(() => {
        users.map(user => {
            console.log("Utilizador:", user);
        });
    });

    const handleDelete = async (username) => {
        console.log("Apagar utilizador com user:", username);
        if (window.confirm("Tens a certeza que queres apagar este utilizador?")) {
            try {
                await userService.deleteUser(username);
                setUsers(users.filter(user => user.username !== username));
            } catch (err) {
                alert("Erro ao apagar utilizador.");
            }
        }
    };

    return (
        <div className="users-list-container">
            <h2>Todos os Utilizadores</h2>
            <table className="users-table">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>
                                <Link to={`/users/${user.username}`}>{user.username}</Link>
                            </td>
                            <td>{user.email}</td>
                            <td>
                                <button onClick={() => handleDelete(user.username)} className="delete-btn">Apagar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UsersList;