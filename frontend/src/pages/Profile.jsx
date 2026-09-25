import { useEffect, useState } from 'react'
import axios from 'axios'

const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:3000").replace(/\/$/, '');

const Profile = () => {
  const [profile, setProfile] = useState([]);
  const [error, setError] = useState('');

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

  return (
    <div>
    <h1>Profiles</h1>
    {error && <p>{error}</p>}
    {profile.map((profile)=>{
    return (
        <div key={profile.id}>
            <p>Name={profile.name}</p>
            <p>email={profile.email}</p>
            <p>phone={profile.phone}</p>
            <p>address={profile.address}</p>
            <p>age={profile.age}</p>
        </div>
    )
      })}
    </div>
  )
}

export default Profile;
