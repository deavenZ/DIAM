import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { userService, clubService } from "../services/api";
import '../styles/UserProfileAdminEdit.css';

function UserProfileAdminEdit() {
    const { username } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ nome: "", email: "", bio: "", favClub: "" });
    const [allClubes, setAllClubes] = useState([]);
    const [avatar, setAvatar] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");

    useEffect(() => {
        clubService.getAll()
            .then(res => setAllClubes(res.data));
        userService.getProfileByUsername(username)
            .then(res => {
                setFormData({
                    nome: res.data.nome || "",
                    email: res.data.email || "",
                    bio: res.data.bio || "",
                    favClub: res.data.favClub || "",
                });
                setPreviewUrl(
                    res.data.avatar && typeof res.data.avatar === "string"
                        ? (res.data.avatar.startsWith("http") ? res.data.avatar : `http://localhost:8000${res.data.avatar}`)
                        : ""
                );
            });
    }, [username]);

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAvatarChange = e => {
        const file = e.target.files[0];
        setAvatar(file);
        if (file) {
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            data.append("nome", formData.nome);
            data.append("email", formData.email);
            data.append("bio", formData.bio);
            data.append("favClub", formData.favClub);
            if (avatar) data.append("avatar", avatar);

            await userService.updateProfileByUsername(username, data); // Garante que aceita FormData
            navigate(`/users/${username}`);
        } catch {
            alert("Erro ao atualizar perfil!");
        }
    };

    return (
        <div className="profile-container">
            <div className="profile-info">
                <h1>Editar Perfil de {username}</h1>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="info-group">
                        <label>Avatar</label>
                        {previewUrl && (
                            <img
                                src={previewUrl}
                                alt="Preview"
                                style={{ width: 100, height: 100, borderRadius: "50%", objectFit: "cover", marginBottom: 10 }}
                            />
                        )}
                        <input type="file" accept="image/*" onChange={handleAvatarChange} />
                    </div>
                    <div className="info-group">
                        <label>Nome</label>
                        <input name="nome" value={formData.nome} onChange={handleChange} />
                    </div>
                    <div className="info-group">
                        <label>Email</label>
                        <input name="email" value={formData.email} onChange={handleChange} />
                    </div>
                    <div className="info-group">
                        <label>Biografia</label>
                        <textarea name="bio" value={formData.bio} onChange={handleChange} />
                    </div>
                    <div className="info-group">
                        <label>Clube Favorito</label>
                        <select name="favClub" value={formData.favClub} onChange={handleChange}>
                            <option value="">Nenhum</option>
                            {allClubes.map(clube => (
                                <option key={clube.id} value={clube.id}>{clube.nome}</option>
                            ))}
                        </select>
                    </div>
                    <button type="submit">Guardar</button>
                    <button type="button" onClick={() => navigate(`/users/${username}`)}>Cancelar</button>
                </form>
            </div>
        </div>
    );
}

export default UserProfileAdminEdit;