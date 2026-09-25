import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const Form = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [age, setAge] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
      try {
        await axios.post(`${API_URL}/api/profiles`, {
          name,
          email,
          phone,
          address,
          age: Number(age)
        });
        navigate('/api/profile');
      } catch {
        setError('Could not save profile. Please try again.');
      }
    }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {error && <p>{error}</p>}
        <input
        type='text'
        placeholder='name'
        value={name}
        onChange={(e) => setName(e.target.value)}
        />

        <input
        type='email'
        placeholder='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />

        <input
        type='text'
        placeholder='phone'
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        />

        <input
        type='text'
        placeholder='address'
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        />

        <input
        type='text'
        placeholder='age'
        value={age}
        onChange={(e) => setAge(e.target.value)}
        />

        <button type="submit">Add Profile</button>
      </form>
    </div>
  )
}

export default Form
