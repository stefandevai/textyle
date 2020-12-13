const Button = ({ text, onClick }) => {
  return (
    <div
      className='cursor-pointer block bg-indigo-800 px-1 py-2 flex items-center text-center rounded-sm w-full'
      onClick={onClick}
    >
      <p className='flex-1 text-white'>
        {text}
      </p>
    </div>
  );
}

export default Button;
