import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { userService, clubService } from "../services/api";
import '../styles/UserProfileAdmin.css';

function UserProfileAdmin() {
    const { username } = useParams();
    const [profile, setProfile] = useState(null);
    const [allClubes, setAllClubes] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        clubService.getAll()
            .then(res => setAllClubes(res.data))
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        if (!allClubes.length) return;
        userService.getProfileByUsername(username)
            .then(res => {
                let favClubName = "N/A";
                let favClubEmblema = null;
                if (res.data.favClub) {
                    const favClub = allClubes.find(clube => clube.id === res.data.favClub);
                    if (favClub) {
                        favClubName = favClub.nome;
                        favClubEmblema = favClub.emblema;
                    }
                }
                setProfile({ ...res.data, favClubName, favClubEmblema });
            })
            .catch(err => console.error(err));
    }, [username, allClubes]);

    if (!profile) {
        return <div style={{ padding: "2rem" }}>A carregar utilizador...</div>;
    }

    return (
        <div className="profile-container">
            <div className="profile-info">
                <div className="welcome-text">
                    <h1>
                        User: {profile.username}
                        <Link to={`/users/${profile.username}/edit`} className="edit-link">Editar Perfil</Link>
                    </h1>
                </div>
                <div className="profile-info-horizontal">
                    <div className="profile-info-content">
                        <div className="info-group">
                            <label>Nome</label>
                            <p>{profile.nome || "N/A"}</p>
                        </div>
                        <div className="info-group">
                            <label>Email</label>
                            <p>{profile.email}</p>
                        </div>
                        <div className="info-group">
                            <label>Biografia:</label>
                            <p>{profile.bio || 'Nenhuma biografia adicionada.'}</p>
                        </div>
                        <div className="info-group">
                            <label>Tipo de Utilizador:</label>
                            <p>
                                {profile.userType === 2
                                    ? "Administrador"
                                    : profile.userType === 1
                                        ? "Moderador"
                                        : "Normal"}
                            </p>
                        </div>
                        <div className="info-group">
                            <label>Clube Favorito:</label>
                            <p style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                {profile.favClubEmblema && (
                                    <img
                                        src={profile.favClubEmblema}
                                        alt={profile.favClubName}
                                        style={{ height: "24px", width: "auto", verticalAlign: "middle" }}
                                    />
                                )}
                                {profile.favClubName}
                            </p>
                        </div>
                        <div className="info-group">
                            <label>Membro desde</label>
                            <p>
                                {profile.joinDate
                                    ? new Date(profile.joinDate).toLocaleDateString('pt-PT')
                                    : 'Data indisponível'}
                            </p>
                        </div>
                    </div>
                    <div className="profile-info-avatar">
                        <img
                            src={profile.avatar.startsWith('http') ? profile.avatar : `http://localhost:8000${profile.avatar}`}
                            alt="Avatar"
                            height="150"
                            width="150"
                            style={{ borderRadius: "50%", objectFit: "cover" }}
                        />
                    </div>
                </div>
            </div>
            <button className="back-button" onClick={() => navigate("/users")}>
                Voltar
            </button>
        </div>
    );
}

export default UserProfileAdmin;