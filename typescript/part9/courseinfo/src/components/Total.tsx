import { CoursePart } from '../types/course';

const Total = (props: { courseParts: CoursePart[] }) => {
  const totalNumber = props.courseParts.reduce(
    (carry, part) => carry + part.exerciseCount,
    0
  )
  return <p>number of exercises: {totalNumber}</p>;
};

export default Total;
