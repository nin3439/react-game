import { Link } from 'react-router-dom';

const mokLevels = [
  {
    id: 1,
    word: 'Самолет',
  },
  {
    id: 2,
    word: 'Вертолет',
  },
  {
    id: 3,
    word: 'Настроение',
  },
];

const Level = (props: any) => {
  const level = mokLevels.filter(
    (item) => item.id === parseInt(props.match.params.number, 10)
  );
  if (!level) {
    return <div>Sorry, but the level was not found</div>;
  }
  return (
    <div>
      <h1>{level[0].word} </h1>
      <Link to="/">Home</Link>
    </div>
  );
};
export default Level;
