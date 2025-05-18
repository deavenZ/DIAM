import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { leagueService, clubService } from '../services/api';
import '../styles/Profile.css';

function Profile() {
  const [username, setUsername] = useState(null);
  const [image, setImage] = useState(null);
  const [profile, setProfile] = useState([]);
  const [previewUrl, setPreviewUrl] = useState('');
  const [joinDate, setJoinDate] = useState(null);
  const [ligas, setLigas] = useState([]);
  const [clubesDaLiga, setClubesDaLiga] = useState([]);
  const [allClubes, setAllClubes] = useState([]);
  const [selectedLiga, setSelectedLiga] = useState('');


  const { user, updateProfile, getProfileInfo, changePassword, setUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    avatar: '',
    bio: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const getProfile = () => {
    getProfileInfo()
      .then(response => {
        console.log("Profile response:", response);
        setProfile(response);
        setUsername(response.username);
        setImage(response.avatar);
        setJoinDate(response.joinDate);

        // Encontrar o clube favorito no array allClubes
        const clubeFav = allClubes.find(c => c.id === response.favClub);
        // Obter o id da liga do clube favorito
        const ligaId = clubeFav ? clubeFav.liga : "";

        setSelectedLiga(ligaId ? String(ligaId) : "");
        setFormData({
          nome: response.nome || '',
          email: response.email || '',
          avatar: response.avatar || '',
          bio: response.bio || '',
          favClub: response.favClub ? response.favClub : '',
        });
        setPreviewUrl('');
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
        setLoading(false);
      })
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([
      leagueService.getAll().then(res => setLigas(res.data)),
      clubService.getAll().then(res => setAllClubes(res.data)),
      getProfile()
    ]).then(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (selectedLiga && !isNaN(Number(selectedLiga))) {
      console.log("selectedLiga (deve ser id):", selectedLiga);
      clubService.getByLiga(selectedLiga).then(res => setClubesDaLiga(res.data));
    } else {
      setClubesDaLiga([]);
    }
  }, [selectedLiga]);

  useEffect(() => {
    if (profile.favClub && allClubes.length > 0) {
      const clubeFav = allClubes.find(c => c.id === profile.favClub);
      const ligaId = clubeFav ? clubeFav.liga : "";
      setSelectedLiga(ligaId ? String(ligaId) : "");
      setFormData(prev => ({
        ...prev,
        favClub: profile.favClub
      }));
    }
  }, [profile, allClubes]);

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleImageChange = (e) => {
    e.preventDefault();
    const image = e.target.files[0];
    if (image && image instanceof Blob) {
      setImage(image);
      setPreviewUrl(URL.createObjectURL(image));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepara os dados para envio
    const dataToSend = {
      nome: formData.nome,
      email: formData.email,
      bio: formData.bio,
      favClub: formData.favClub,
    };

    // Se o utilizador selecionou uma nova imagem, inclui-a
    if (previewUrl && image instanceof File) {
      dataToSend.avatar = image;
    }

    try {
      await updateProfile(dataToSend);
      await getProfile(); // Atualiza o perfil no frontend
      setPreviewUrl('');
      setIsEditing(false); // <-- Só aqui, depois de tudo atualizado!
    } catch (err) {
      console.error('Erro ao atualizar perfil:', err);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      alert("As novas passwords não coincidem!");
      return;
    }

    if (formData.newPassword.length < 6) {
      alert("A nova password deve ter pelo menos 6 caracteres!");
      return;
    }
    try {
      await changePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword,
      });
      alert("Password alterada com sucesso!");
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      }));
    } catch (err) {
      alert("Erro ao alterar password.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (
    loading ||
    !profile ||
    ligas.length === 0 ||
    allClubes.length === 0
  ) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "60vh",
        fontSize: "1.5rem"
      }}>
        Loading...
      </div>
    );
  }
  if (!user) {
    return null; // Ou podes mostrar um spinner/loading se quiseres
  }


  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>Perfil do Usuário</h2>
        <button
          className="edit-profile-button"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Cancelar' : 'Editar Perfil'}
        </button>
      </div>

      {isEditing ? (
        <div>
          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={handleChange}
                disabled={true}
              />
            </div>
            <div className="form-group">
              <label htmlFor="nome">Nome</label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="image">Carregar imagem de perfil</label>
              <img
                src={previewUrl || ("http://127.0.0.1:8000" + image)}
                alt="image"
                height="150px"
                width="150px"
                style={{ borderRadius: "10%" }}
              /><br />
              <input type="file" onChange={handleImageChange} accept="image/*" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="bio">Biografia</label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows="4"
                placeholder="Conte um pouco sobre você..."
              />
            </div>
            <div className="form-group">
              <label htmlFor="liga">Liga</label>
              <select
                id="liga"
                value={selectedLiga}
                onChange={e => {
                  setSelectedLiga(e.target.value);
                  setFormData(prev => ({ ...prev, favClub: "" })); // Limpa o clube favorito
                }}
              >
                <option value="">Nenhuma liga e clube selecionados</option>
                {ligas.map(liga => (
                  <option key={liga.id} value={liga.id}>{liga.nome}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="favClub">Clube Favorito</label>
              <select
                id="favClub"
                name="favClub"
                value={formData.favClub || ''}
                onChange={e => {
                  if (e.target.value !== '') {
                    handleChange(e);
                  }
                }}
                disabled={!selectedLiga}
              >
                <option value="">Selecione um clube</option>
                {clubesDaLiga.map(clube => (
                  <option key={clube.id} value={clube.id}>{clube.nome}</option>
                ))}
              </select>
            </div>
            <div className="form-actions">
              <button type="submit" className="save-button">
                Salvar Alterações
              </button>
            </div>
          </form>
          <h2 className="password-title">Alterar Senha</h2>
          <form onSubmit={handlePasswordChange} className="profile-form" style={{ marginTop: "2rem" }}>
            <div className="password-section">
              <div className="form-group">
                <label htmlFor="currentPassword">Senha Atual</label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="newPassword">Nova Senha</label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirmar Nova Senha</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="save-button">
                  Alterar Senha
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <div className="profile-info">
          <div className="welcome-text">
            <h1>
              {profile.nome && profile.nome.trim()
                ? `Bem-vindo, ${profile.nome.split(' ')[0]}`
                : 'Bem-vindo'}
            </h1>
          </div>
          <div className="profile-info-horizontal">
            <div className="profile-info-content">
              <div className="info-group">
                <label>Username</label>
                <p>{user.username}</p>
              </div>
              <div className="info-group">
                <label>Email</label>
                <p>{user.email}</p>
              </div>
              <div className="info-group">
                <label>Biografia:</label>
                <p>{profile.bio || 'Nenhuma biografia adicionada.'}</p>
              </div>
              <div className="info-group">
                <label>Clube Favorito:</label>
                <p style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  {(() => {
                    const clubeObj = allClubes.find(c => c.id === profile.favClub);
                    return clubeObj ? (
                      <>
                        {clubeObj.emblema && (
                          <img
                            src={clubeObj.emblema}
                            alt={clubeObj.nome}
                            style={{ height: "24px", width: "auto", verticalAlign: "middle" }}
                          />
                        )}
                        {clubeObj.nome}
                      </>
                    ) : 'Nenhum clube selecionado.'
                  }
                  )()}
                </p>
              </div>
              <div className="info-group">
                <label>Membro desde</label>
                <p>
                  {joinDate
                    ? new Date(joinDate).toLocaleDateString('pt-PT')
                    : 'Data indisponível'}
                </p>
              </div>
            </div>
            <div className="profile-info-avatar">
              <img
                src={"http://127.0.0.1:8000" + profile.avatar}
                alt="Avatar"
                height="150"
                width="150"
                style={{ borderRadius: "50%", objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
