<div className="card-top">
  <img src={userData.avatar_url} alt="" />
  <div className="card-top-top">
    <h2 className="name">{userData.name}</h2>
    <span className="date">Joined {formatDate(userData.created_at)}</span>
  </div>

  <span className="login">{userData.login}</span>
  <div>
    <p className="bio">
      {userData.bio ? userData.bio : "This profile has no bio"}
    </p>
  </div>
</div>;
