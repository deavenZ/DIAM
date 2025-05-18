import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { userService } from "../services/api";
import '../styles/UsersList.css';

function UsersList() {
    const { user } = useAuth();
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
                    {users.map(u => (
                        <tr key={u.id}>
                            <td>
                                <Link to={`/users/${u.username}`}>{u.username}</Link>
                            </td>
                            <td>{u.email}</td>
                            <td>
                                {(u.userType === 0 || (u.userType === 1 && user.is_superuser)) ? (
                                    <button
                                        onClick={() => handleDelete(u.username)}
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