export default function SliderInput(props) {
  // ====================================
  // Render
  // ====================================
  return (
    <div>
      <p>
        <strong>{props.title}</strong>
      </p>
      <span>{props.value}px</span>
      <input type="range" min="1" max="100" value={props.value} onChange={props.onChange} />
    </div>
  );
}
