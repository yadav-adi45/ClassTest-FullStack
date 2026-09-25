import { useEffect, useState } from 'react'
import axios from 'axios'

const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:3000").replace(/\/$/, '');

const Profile = () => {
  const [profile, setProfile] = useState([]);
  const [error, setError] = useState('');
  const [editingProfile, setEditingProfile] = useState(null);

  const getprofile = async () => {
    try {
      const result = await axios.get(`${API_URL}/api/profiles`);
      setProfile(result.data);
    } catch {
      setError('Could not load profile');
    }
  }

  useEffect(() => {
    // The request synchronizes the initial profile state with the API.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getprofile();
  }, []);

  const startEditing = (selectedProfile) => {
    setError('');
    setEditingProfile({ ...selectedProfile, age: String(selectedProfile.age) });
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const result = await axios.put(`${API_URL}/api/profiles/${editingProfile.id}`, {
        name: editingProfile.name,
        email: editingProfile.email,
        phone: editingProfile.phone,
        address: editingProfile.address,
        age: Number(editingProfile.age)
      });

      setProfile((currentProfiles) => currentProfiles.map((currentProfile) => (
        currentProfile.id === result.data.profile.id ? result.data.profile : currentProfile
      )));
      setEditingProfile(null);
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Could not update profile. Please try again.');
    }
  };

  const updateField = (field, value) => {
    setEditingProfile((currentProfile) => ({ ...currentProfile, [field]: value }));
  };

  return (
    <div>
    <h1>Profiles</h1>
    {error && <p>{error}</p>}
    {editingProfile && (
      <form onSubmit={handleUpdate}>
        <h2>Update Profile</h2>
        <input value={editingProfile.name} onChange={(event) => updateField('name', event.target.value)} required />
        <input type="email" value={editingProfile.email} onChange={(event) => updateField('email', event.target.value)} required />
        <input value={editingProfile.phone} onChange={(event) => updateField('phone', event.target.value)} required />
        <input value={editingProfile.address} onChange={(event) => updateField('address', event.target.value)} required />
        <input type="number" value={editingProfile.age} onChange={(event) => updateField('age', event.target.value)} required min="1" />
        <button type="submit">Save Changes</button>
        <button type="button" onClick={() => setEditingProfile(null)}>Cancel</button>
      </form>
    )}
    {profile.map((profile)=>{
    return (
        <div key={profile.id}>
            <p>Name={profile.name}</p>
            <p>email={profile.email}</p>
            <p>phone={profile.phone}</p>
            <p>address={profile.address}</p>
            <p>age={profile.age}</p>
            <button type="button" onClick={() => startEditing(profile)}>Update</button>
        </div>
    )
      })}
    </div>
  )
}

export default Profile;
