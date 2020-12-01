export default function SliderInput(props) {
  return (
    <div>
      <h4>{props.title}</h4>
      <span>{props.value}px</span>
      <input
        type='range'
        min='1'
        max='100'
        value={props.value}
        onChange={props.onChange} />
    </div>
  );
};
