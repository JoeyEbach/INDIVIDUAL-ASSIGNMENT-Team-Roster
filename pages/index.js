/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-no-comment-textnodes */
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();

  return (
    <div id="home">
      <h1 className="homeTitle">Welcome, {user.displayName}</h1>
      <div id="homeImgContainer">
        <img id="homeImg" src="https://img.freepik.com/premium-photo/nfl-ball-ground-with-stadium-background-goal-wide-angle-made-by-aiartificial-intelligence_41969-12101.jpg" alt="football_field" />
      </div>
      <p>Click below to get started!</p>
      <div id="homeBtnsContainer">
        <Link href="/teams" passHref>
          <Button variant="outline-secondary" className="m-2">View Teams
          </Button>
        </Link>
        <Link href="/members" passHref>
          <Button variant="outline-secondary" className="m-2">View Members
          </Button>
        </Link>
        <Link href="/team/new" passHref>
          <Button variant="outline-secondary" className="m-2">Add A Team
          </Button>
        </Link>
        <Link href="/member/new" passHref>
          <Button variant="outline-secondary" className="m-2">Add A Member
          </Button>
        </Link>
      </div>

    </div>
  );
}

export default Home;
