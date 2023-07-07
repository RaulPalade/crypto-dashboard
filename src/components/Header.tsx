export interface Props {
  text: string;
}

function Header(props: Props) {
  return (
    <div className="w-full text-5xl text-white">
      <h1>{props.text}</h1>
    </div>
  );
}

export default Header;
