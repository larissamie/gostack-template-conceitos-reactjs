import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories([...repositories, response.data]);
    })
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    });
    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const index = repositories.findIndex(repo => repo.id === id);
    if (index < 0) return false;
    var newRepositories = repositories;
    newRepositories.splice(index, 1);
    setRepositories([...newRepositories]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository, index) => (
          /* Adicionando (+ index) para previnir o erro (Each child in a list should have a unique "key" prop.) */
          <li key={repository.id + index}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
