import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Profile.css';

function Profile() {
  const [username, setUsername] = useState(null);
  const [image, setImage] = useState(null);
  const [profile, setProfile] = useState([]);
  const [previewUrl, setPreviewUrl] = useState('');



  const { user, updateProfile, getProfileInfo } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    profile_picture: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();

  const getProfile = () => {
    getProfileInfo()
      .then(response => {
        setProfile(response.data);
        setUsername(response.data.username);
        setImage(response.data.profile_picture);
        setPreviewUrl(response.data.profile_picture);
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
      });
  }


  useEffect(() => {
    getProfile();
  }, []);

  const handleImageChange = (e) => {
    e.preventDefault();
    const image = e.target.files[0];
    if (image) {
      setImage(image);
      setPreviewUrl(URL.createObjectURL(image));
    } else {
      setImage(null);
      setPreviewUrl('');
    }
  };

  function getCSRFToken() {
    return document.cookie.split('; ').find(row => row.startsWith('csrftoken='))?.split('=')[1];
  }

  const handleUpload = (e) => {
    e.preventDefault();
    if (image) {
      const updatedProfile = profile;
      updateProfile(updatedProfile)
        .then(() => getProfile())
        .catch(err => console.error('Erro ao atualizar perfil:', err));
      setPreviewUrl('');
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Submit profile updates to backend
    // This will be implemented when we connect to the backend
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!user) {
    return <div>Loading...</div>;
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
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <h3>Carregar imagem de perfil</h3>
            <img src={"http://127.0.0.1:8000" + image} alt="image" height="150px" /><br />
            <input type="file" onChange={handleImageChange} accept="image/*" />
            <button onClick={(e) => handleUpload(e, profile)}>Upload</button><br />
            {previewUrl && <img src={previewUrl} alt="Preview" height="100px" />}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="password-section">
            <h3>Alterar Senha</h3>
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
          </div>

          <div className="form-actions">
            <button type="submit" className="save-button">
              Salvar Alterações
            </button>
          </div>
        </form>
      ) : (
        <div className="profile-info">
          <div className="info-group">
            <label>Nome</label>
            <p>{user.name}</p>
          </div>

          <div className="info-group">
            <label>Email</label>
            <p>{user.email}</p>
          </div>

          <div className="info-group">
            <label>Membro desde</label>
            <p>{new Date(user.joinDate).toLocaleDateString()}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
