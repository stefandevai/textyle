const FileInput = ({ title, onUpload }) => {
  return (
    <div>
      <p>{title}</p>
      <input
        type='file'
        min='1'
        max='100'
        value=''
        onChange={onUpload} />
    </div>
  );
};

export default FileInput;
