const Content = (props: { number: number; text: string }) => {
  return (
    <p>
      {props.text}: {props.number}
    </p>
  );
};

export default Content;
