/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleMember } from '../../api/members';
import { getTeamDetails } from '../../api/mergedData';

export default function ViewMember() {
  const [memberDetails, setMemberDetails] = useState({});
  const [teamDetails, setTeamDetails] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  const getDetails = () => {
    getSingleMember(firebaseKey).then((obj) => {
      setMemberDetails(obj);
      getTeamDetails(obj.teamId).then(setTeamDetails);
    });
  };

  useEffect(() => {
    getDetails();
  }, [firebaseKey]);

  return (
    // eslint-disable-next-line react/jsx-no-comment-textnodes
    <div>
      <img src={memberDetails.image} alt={memberDetails.name} style={{ width: '300px' }} />
      <h1>{memberDetails.name}</h1>
      <h5>{teamDetails.name}</h5>
      <h5>{memberDetails.role}</h5>
    </div>
  );
}
