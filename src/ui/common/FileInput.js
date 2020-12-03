const FileInput = ({ title, onUpload }) => {
  return (
    <div>
      <p><strong>{title}</strong></p>
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
