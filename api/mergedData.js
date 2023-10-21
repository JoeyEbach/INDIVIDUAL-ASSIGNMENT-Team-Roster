import { deleteTeamMember, getMembersByTeamId } from './members';
import { deleteTeam, getSingleTeam } from './teams';

const deleteTeamMembersRelationship = (teamId) => new Promise((resolve, reject) => {
  getMembersByTeamId(teamId).then((teamMembersArray) => {
    const deleteMemberPromises = teamMembersArray.map((member) => deleteTeamMember(member.firebaseKey));

    Promise.all(deleteMemberPromises).then(() => {
      deleteTeam(teamId).then(resolve);
    });
  }).catch((error) => reject(error));
});

const getTeamDetails = async (firebaseKey) => {
  const team = await getSingleTeam(firebaseKey);
  const members = await getMembersByTeamId(firebaseKey);

  return { ...team, members };
};

export {
  deleteTeamMembersRelationship,
  getTeamDetails,
};
