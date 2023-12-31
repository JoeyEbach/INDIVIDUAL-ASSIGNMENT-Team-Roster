import { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import { getTeams } from '../api/teams';
import TeamCard from '../components/TeamCard';

function Teams() {
  const { user } = useAuth();
  const [cards, setCards] = useState([]);

  const getAllTheCards = () => {
    getTeams(user.uid).then(setCards);
  };

  useEffect(() => {
    getAllTheCards();
  }, []);

  return (
    <div>
      <h1 className="teamTitle">TEAMS</h1>
      <div id="teamContainer">
        <div id="allTeams">
          {cards.map((card) => (
            <TeamCard key={card.firebaseKey} teamObj={card} onUpdate={getAllTheCards} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Teams;
