/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleTeam } from '../../api/teams';
import { getMembersByTeamId } from '../../api/members';
import MemberCard from '../../components/MemberCard';

export default function ViewTeam() {
  const [teamDetails, setTeamDetails] = useState({});
  const [members, setMembers] = useState([]);
  const router = useRouter();
  const { firebaseKey } = router.query;

  const getDetails = () => {
    getSingleTeam(firebaseKey).then(setTeamDetails);
    getMembersByTeamId(firebaseKey).then(setMembers);
  };

  console.warn(members);

  useEffect(() => {
    getDetails();
  }, [firebaseKey]);

  return (
    // eslint-disable-next-line react/jsx-no-comment-textnodes
    <div>
      <h1 className="teamHead">{teamDetails.name}</h1>
      <div id="teamPgImg">
        <img src={teamDetails.image} alt={teamDetails.name} className="teamPageImg" />
      </div>
      <div id="teamMemsContainer">
        <div id="teamMems">

          {members.map((member) => (
            <MemberCard key={member.firebaseKey} memberObj={member} onUpdate={getDetails} />
          ))}
        </div>
      </div>
    </div>
  );
}
