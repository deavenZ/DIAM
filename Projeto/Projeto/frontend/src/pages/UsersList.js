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

    const handleDelete = async (id) => {
        if (window.confirm("Tens a certeza que queres apagar este utilizador?")) {
            try {
                await userService.deleteUser(id);
                setUsers(users.filter(user => user.id !== id));
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
                                {(user.userType !== 1 && user.userType !== 2) ? (
                                    <button
                                        onClick={() => handleDelete(user.id)}
                                        className="delete-btn"
                                    >
                                        Apagar
                                    </button>
                                ) : (
                                    <span style={{ color: "#888", fontStyle: "italic" }}>
                                        Não permitido
                                    </span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UsersList;