import React, { useState } from 'react';
import './index.css';
import ProfileCard from './components/ProfileCard';
import RepoList from './components/RepoList';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';

function App() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchedUsers, setSearchedUsers] = useState([]);

  const handleSearch = async () => {
    if (!username.trim()) return;

    setLoading(true);
    setError('');
    setUserData(null);
    setRepos([]);

    try {
      const resUser = await fetch(`https://api.github.com/users/${username}`);
      if (!resUser.ok) throw new Error('User not found');

      const user = await resUser.json();
      setUserData(user);

      const resRepos = await fetch(`https://api.github.com/users/${username}/repos`);
      const reposData = await resRepos.json();
      setRepos(reposData);

      setSearchedUsers((prev) => {
        const updated = [username, ...prev.filter(u => u !== username)];
        return updated.slice(0, 5);
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" from-slate-50 to-slate-200 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-between">
      {/* Header */}
      <header className="w-full bg-indigo-700 text-white py-6 shadow-md">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h1 className="text-4xl font-bold tracking-tight">GitHub Profile Explorer</h1>
          <p className="mt-2 text-sm md:text-base font-light">Search and explore GitHub profiles and repositories</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full max-w-4xl px-4 py-10 flex flex-col items-center justify-center">
        <section className="w-full bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-xl">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <input
              type="text"
              placeholder="Enter GitHub username"
              className="flex-1 px-4 py-3  rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button
              onClick={handleSearch}
              className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition font-semibold shadow"
            >
              Search
            </button>
          </div>
        </section>

        {/* Conditional Rendering */}
        <div className="mt-8 w-full space-y-6">
          {loading && <Loader />}
          {error && <ErrorMessage message={error} />}
          {userData && <ProfileCard user={userData} />}
          {repos.length > 0 && <RepoList repos={repos} />}
        </div>

        {/* Recent Searches */}
        {searchedUsers.length > 0 && (
          <div className="mt-12 w-full bg-white dark:bg-gray-900 p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Recent Searches</h2>
            <div className="flex flex-wrap gap-3">
              {searchedUsers.map((user, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setUsername(user);
                    handleSearch();
                  }}
                  className="px-4 py-2 bg-indigo-100 dark:bg-indigo-700 text-indigo-800 dark:text-white rounded-full hover:bg-indigo-200 dark:hover:bg-indigo-600 transition"
                >
                  {user}
                </button>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full bg-indigo-700 text-white py-4 mt-8">
        <div className="max-w-4xl mx-auto px-4 text-center text-sm">
          &copy; {new Date().getFullYear()} GitHub Profile Explorer. Built by a passionate Front-End Developer.
        </div>
      </footer>
    </div>
  );
}

export default App;
