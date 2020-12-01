const FileInput = (props) => {
  return (
    <div>
      <p><strong>{props.title}</strong></p>
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

export default FileInput;

