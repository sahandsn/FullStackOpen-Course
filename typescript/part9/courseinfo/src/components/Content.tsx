import {Fragment} from 'react'
import { CoursePart } from '../types/course';
import Part from './Part';

const Content = (props: { courseParts: CoursePart[] }) => {
  return (
    <>
      {props.courseParts.map((p, i) => (
        <Fragment key={i}>
          <h2>
            {p.name} {p.exerciseCount}
          </h2>
          <Part part={p}  />
        </Fragment>
      ))}
    </>
  );
};

export default Content;
