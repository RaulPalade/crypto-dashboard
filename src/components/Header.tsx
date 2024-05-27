export interface Props {
  text: string;
}

function Header(props: Props) {
  return (
    <div className="w-full text-5xl font-bold text-white">
      <p>{props.text}</p>
    </div>
  );
}

export default Header;
