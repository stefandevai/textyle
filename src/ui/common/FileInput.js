export default function FileInput(props) {
  return (
    <div>
      <h4>{props.title}</h4>
      <span>{props.filename || ''}</span>
      <input
        type='file'
        min='1'
        max='100'
        value=''
        onChange={props.onUpload} />
    </div>
  );
};

