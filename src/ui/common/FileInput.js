const FileInput = ({ title, onUpload }) => {
  // ====================================
  // Render
  // ====================================
  return (
    <div>
      <input
        type='file'
        name='tilesetFile'
        id='tilesetFile'
        min='1'
        max='100'
        value=''
        onChange={onUpload}
        style={{ width: '0.1px', height: '0.1px', opacity: 0, overflow: 'hidden', position: 'absolute', zIndex: '-1' }}
      />
      <label htmlFor='tilesetFile' className='cursor-pointer block bg-indigo-800 px-1 py-2 flex items-center text-center rounded-sm'>
        <p className='flex-1 text-white'>
          Choose a file...
        </p>
      </label>
    </div>
  );
};

export default FileInput;
