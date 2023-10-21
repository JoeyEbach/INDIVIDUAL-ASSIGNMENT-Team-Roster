import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import TeamForm from '../../../components/forms/TeamForm';
import { getSingleTeam } from '../../../api/teams';

export default function EditMember() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleTeam(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return (<TeamForm teamObj={editItem} />);
}
