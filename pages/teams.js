import { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import { getTeam } from '../api/members';
import MemberCard from '../components/MemberCard';

function Teams() {
  const { user } = useAuth();
  const [cards, setCards] = useState([]);

  const getAllTheCards = () => {
    getTeam(user.uid).then(setCards);
  };

  useEffect(() => {
    getAllTheCards();
  }, []);

  return (
    <div>
      <h1>Your Team</h1>
      {cards.map((card) => (
        <MemberCard key={card.firebaseKey} memberObj={card} onUpdate={getAllTheCards} />
      ))}

    </div>
  );
}

export default Teams;
