import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { userService } from "../services/api";
import '../styles/UsersList.css';

function UsersList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        userService.getAllUsers().then(res => setUsers(res.data));
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Tens a certeza que queres apagar este utilizador?")) {
            try {
                await userService.deleteUser(id);
                setUsers(users.filter(u => u.id !== id));
            } catch (err) {
                alert("Erro ao apagar utilizador.");
            }
        }
    };

    return (
        <div className="users-list-container">
            <h2>Todos os Utilizadores</h2>
            <ul className="users-list">
                {users.map(u => (
                    <li key={u.id}>
                        <Link to={`/users/${u.id}`}>{u.username}</Link>
                        <Link to={`/users/${u.id}/edit`}>Editar</Link>
                        <button onClick={() => handleDelete(u.id)}>Apagar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UsersList;