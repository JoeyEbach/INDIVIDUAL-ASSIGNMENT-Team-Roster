/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleMember } from '../api/members';

export default function ViewMember() {
  const [memberDetails, setMemberDetails] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  const getDetails = () => {
    getSingleMember(firebaseKey).then(setMemberDetails);
  };

  useEffect(() => {
    getDetails();
  }, [firebaseKey]);

  return (
    // eslint-disable-next-line react/jsx-no-comment-textnodes
    <div>
      <img src={memberDetails.image} alt={memberDetails.name} style={{ width: '300px' }} />
      <h1>{memberDetails.name}</h1>
      <h5>{memberDetails.role}</h5>
    </div>
  );
}
