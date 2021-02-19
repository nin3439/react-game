import { Link } from 'react-router-dom';

const AllLevels = () => (
  <div>
    <ul>
      {['1 level', '2 level', '3 level'].map((p, index) => (
        <li key={index + 1}>
          <Link to={`/level/${index + 1}`}>{p}</Link>
        </li>
      ))}
    </ul>
  </div>
);

export default AllLevels;
