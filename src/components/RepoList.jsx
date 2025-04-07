import React from 'react'; 
function RepoList({ repos }) {
    return (
      <div className="mt-4 p-4 bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <h3 className="text-xl font-semibold">Repositories:</h3>
        <ul>
          {repos.slice(0, 5).map((repo) => (
            <li key={repo.id} className="mt-2">
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                {repo.name}
              </a>
              <p className="text-gray-600 dark:text-gray-300">{repo.description}</p>
              <p className="text-gray-500 dark:text-gray-400">
                Stars: {repo.stargazers_count} | Forks: {repo.forks_count} | Language: {repo.language}
              </p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default RepoList;
  