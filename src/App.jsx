import { useState } from 'react';
import './App.css';
import axios from 'axios';
import Sun from "/icon-sun.svg"
import Moon from "/icon-moon.svg"

function App() {
  const [search, setSearch] = useState('');
  const [userData, setUserData] = useState({});
  const [theme, setTheme] = useState('DARK');

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`https://api.github.com/users/${search}`);
      setUserData(response.data);
      console.log(response.data)
    } catch (error) {
      console.error(error);
    }
  };
  const toggleTheme = () => {
    setTheme(theme === 'DARK' ? 'LIGHT' : 'DARK');
  };
  // function formatDate(dateString) {
  //   const date = new Date(dateString);
  //   const formatter = new Intl.DateTimeFormat('en-US', {
  //     year: 'numeric',
  //     month: 'short',
  //     day: '2-digit'
  //   });
  
  //   const formattedDate = formatter.format(date);
  
  //   return `Joined ${formattedDate}`;
  // }
  

  return (
    <main>
      <div className='top'>
        <h3>divfinder</h3>
        <button className='theme_btn' onClick={toggleTheme}>
          <span className='theme'>DARK</span>
          <img src={theme === 'DARK' ? Moon : Sun} alt="Theme icon" />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="search_container">
        <img src="/icon-search.svg" alt="" />
        <input
          type="text"
          placeholder='Search Github username...'
          value={search}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>
      
        <div className="card">
          <div className="card-top">
          <img src={userData.avatar_url} alt="" />
          <div className="card-top-middle">
            <h2 className="name">{userData.name}</h2>
            <span className="link">{userData.login}</span>
            <p className="bio">{userData.bio ? userData.bio:"This profile has no bio" }</p>
          </div>
              <div className="card-top-right">
                <span className="date">hii</span>
              </div>
          </div>
          <div className="card_middle">
            <div className="repos_container">
              <span className='reposText'>Repos</span>
              <span className="reposNum">{userData.public_repos}</span>
            </div>
            <div className="followers_container">
                <span className="followersText">Followers</span>
                <span className="followersNum">{userData.followers}</span>
            </div>
            <div className="following_container">
              <span className="followingText">Following</span>
              <span className="followingNum">{userData.following}</span>
            </div>
          </div>
            <div className="card_bottom">
              <div className="location_twitter">
                  <div className="location_container">
                    <img src="/icon-location.svg" alt="" />
                    <span className="location">{userData.location}</span>
                  </div>
                  <div className="tweeter-container">
                    <img src="/icon-twitter.svg" alt="" />
                    <span className="tweeter">{userData.twitter_username}</span>
                  </div>
              </div>
                <div className="website_company">
                  <div className="website_container">
                    <img src="/icon-website.svg" alt="" />
                    <span className="site">{userData.blog}</span>
                  </div>
                  <div className="company_container">
                    <img src="/icon-company.svg" alt="" />
                    <span className="company">{userData.company}</span>
                  </div>
                </div>
            </div>
        </div>
      
    </main>
  );
}

export default App;
