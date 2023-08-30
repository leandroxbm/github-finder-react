import { Header } from '../../components/Header';
import background from '../../assets/background.png';
import ItemList from '../../components/ItemList';
import './styles.css';
import { useState } from 'react';
import Perfil from '../../components/Perfil';

function App() {
  const [user, setUser] = useState('');
  const [currentUser, setcurrentUser] = useState(null);
  const [repos, setRepos] = useState(null);

  const handleGetData = async () => {
    const userData = await fetch(`https://api.github.com/users/${user}`);
    const newUser = await userData.json();

    if(newUser.name){
      const {avatar_url, login, name, bio} = newUser;
      setcurrentUser({avatar_url, login, name, bio});

      const reposData = await fetch(`https://api.github.com/users/${user}/repos`);
      const newRepos = await reposData.json();

      if(newRepos.length){
        setRepos(newRepos);
      }

    }
  }

  return (
    <div className="App">
      <Header />
      <div className='conteudo'>
        <img src={background} className='background' alt='background app' />
        <div className='info'>
          <div>
            <input name='usuario'
              value={user}
              onChange={event => setUser(event.target.value)} 
              placeholder='@username' />
            <button onClick={handleGetData}>Buscar</button>
          </div>

          {currentUser?.name ? (
            <Perfil avatar={currentUser.avatar_url} name={currentUser.name}  login={currentUser.login}  bio={currentUser.bio} ></Perfil>
          ):null}
          
          {repos?.length ? (
            <div>
              <h4 className='repositorio'>Repositórios</h4>
              {repos.map(repo => (
                <ItemList title={repo.name} description={repo.description}></ItemList>
              ))}
            </div>
          ):null}
        </div>
      </div>
    </div>
  );
}

export default App;
