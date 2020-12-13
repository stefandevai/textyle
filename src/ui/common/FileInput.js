import Button from 'ui/common/Button';

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
      <label htmlFor='tilesetFile' className='block '>
        <Button text='Choose a file...' />
      </label>
    </div>
  );
};

export default FileInput;
