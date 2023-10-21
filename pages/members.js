import { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import { getMembers } from '../api/members';
import MemberCard from '../components/MemberCard';

function Teams() {
  const { user } = useAuth();
  const [cards, setCards] = useState([]);

  const getAllTheCards = () => {
    getMembers(user.uid).then(setCards);
  };

  useEffect(() => {
    getAllTheCards();
  }, []);

  return (
    <div className="memDiv">
      <h1 className="memTitle">MEMBERS</h1>
      <div id="memContainer">
        <div id="allMembers">
          {cards.map((card) => (
            <MemberCard key={card.firebaseKey} memberObj={card} onUpdate={getAllTheCards} />
          ))}
        </div>
      </div>

    </div>
  );
}

export default Teams;
