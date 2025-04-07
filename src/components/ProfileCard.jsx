import React from 'react';

function ProfileCard({ user }) {
  return (
    <div className="mt-4 p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800 max-w-xs mx-auto">
      {/* Avatar Section */}
      <div className="flex justify-center">
        <img
          src={user.avatar_url}
          alt={user.name}
          className="w-32 h-32 rounded-full border-4 border-indigo-500"
        />
      </div>

      {/* Name and Bio Section */}
      <div className="text-center mt-4">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">{user.name}</h2>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">{user.bio || 'No bio available'}</p>
        <p className="text-gray-500 dark:text-gray-400 mt-2">@{user.login}</p>
        <p className="text-gray-500 dark:text-gray-400">{user.location || 'Location not provided'}</p>
      </div>

      {/* Social and Stats Section */}
      <div className="flex justify-center mt-4 space-x-6">
        <a
          href={user.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition duration-200"
        >
          GitHub Profile
        </a>
        <div className="flex items-center space-x-2">
          <span className="text-gray-500 dark:text-gray-400">
            {user.followers} Followers
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-gray-500 dark:text-gray-400">
            {user.following} Following
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
