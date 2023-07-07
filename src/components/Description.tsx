export interface Props {
  text: any;
}

function Description(props: Props) {
  return (
    <div className="w-full text-justify text-lg font-light text-gray-300">
      {props.text}
    </div>
  );
}

export default Description;
