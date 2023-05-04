import { CoursePart } from '../types/course';

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.kind) {
    case 'basic': {
      return (
        <>
          <p>{part.description}</p>
        </>
      );
    }
    case 'background': {
      return (
        <>
          <p>{part.description}</p>
          <p>submit to {part.backgroundMaterial}</p>
        </>
      );
    }
    case 'group': {
      return (
        <>
          <p>project exercises {part.groupProjectCount}</p>
        </>
      );
    }
    case 'special': {
      return (
        <>
          <p>{part.description}</p>
          <p>required skills: {part.requirements.toString()}</p>
        </>
      );
    }
    default: {
      const exhastiveChecker: never = part;
      return exhastiveChecker;
    }
  }
};

export default Part;
