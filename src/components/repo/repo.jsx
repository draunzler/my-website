import React, { useState, useEffect } from 'react';
import './repo.css';

const RepoDetails = () => {
  const [recentRepos, setRecentRepos] = useState([]);

  useEffect(() => {
    const username = 'draunzler';
    const apiUrl = `https://api.github.com/users/${username}/repos?sort=created&per_page=5`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => setRecentRepos(data))
      .catch(error => console.error('Error fetching recent repositories:', error));
  }, []);

  const fetchLanguage = (repo) => {
    const languageApiUrl = repo.languages_url;

    return fetch(languageApiUrl)
      .then(response => response.json())
      .then(data => {
        const languages = Object.keys(data);
        return languages.length > 0 ? languages[0] : 'Unknown';
      })
      .catch(error => {
        console.error('Error fetching repository language:', error);
        return 'Unknown';
      });
  };

  useEffect(() => {
    const fetchLanguagesForRepos = async () => {
      const reposWithLanguages = await Promise.all(recentRepos.map(repo => fetchLanguage(repo)));
      setRecentRepos((prevRepos) => {
        return prevRepos.map((repo, index) => ({
          ...repo,
          language: reposWithLanguages[index],
        }));
      });
    };

    if (recentRepos.length > 0) {
      fetchLanguagesForRepos();
    }
  }, [recentRepos]);

  return (
    <div className='repo'>
      <h1>Most Recent Repositories</h1>
      {recentRepos.length > 0 ? (
        <ul>
          {recentRepos.map(repo => (
            <li key={repo.id}>
              <h2>{repo.name}</h2> {repo.description} Language: {repo.language}{' '}
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                Visit Repository
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default RepoDetails;
