import Tool from 'ui/toolbar/Tool';

const Toolbar = () => {
  return (
    <nav>
      <ul style={{ margin: '0' }}>
        <Tool name="T1" />
        <Tool name="T2" />
        <Tool name="T3" />
      </ul>
    </nav>
  );
}

export default Toolbar;

