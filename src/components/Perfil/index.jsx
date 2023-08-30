import './styles.css'

function Perfil({avatar, name, login,bio}) {
  return (
    <>
      <div className='perfil'>
        <img src={avatar} className='profile' alt='profile' />
        <div>
          <h3>{name}</h3>
          <span>@{login}</span>
          <p>{bio}</p>
        </div>
      </div>
      <hr />
    </>
  )
}

export default Perfil;