// src/pages/Home.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebaseConfig.js';
import { Link } from 'react-router-dom';

const mockRecipes = [
  {
    id: 1,
    title: 'Spaghetti Carbonara',
    description: 'A classic Italian pasta dish with eggs, cheese, pancetta, and pepper.',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    title: 'Chicken Curry',
    description: 'A flavorful curry made with chicken, spices, and coconut milk.',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 3,
    title: 'Chocolate Cake',
    description: 'A rich and moist chocolate cake topped with chocolate frosting.',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 4,
    title: 'Caesar Salad',
    description: 'A fresh salad with romaine lettuce, croutons, and Caesar dressing.',
    image: 'https://via.placeholder.com/150',
  },
];

const Home = () => {
  const { currentUser } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <header style={{ marginBottom: '20px' }}>
        <h1>Recipe Manager</h1>
        {currentUser ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <Link to="/login">
            Login
          </Link>
        )}
      </header>

      <p>Your personal recipe book. Add, search, and manage all your favorite recipes!</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '20px', margin: '20px 0' }}>
        {mockRecipes.map((recipe) => (
          <div key={recipe.id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '10px' }}>
            <img src={recipe.image} alt={recipe.title} style={{ width: '100%', borderRadius: '8px' }} />
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
          </div>
        ))}
      </div>

      <footer style={{ marginTop: '20px', borderTop: '1px solid #ccc', padding: '10px' }}>
        <p>&copy; 2024 Recipe Manager. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export { Home };
