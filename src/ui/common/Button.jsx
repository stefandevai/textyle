const Button = ({ text, onClick }) => {
  return (
    <div
      className="cursor-pointer block bg-green-600 hover:bg-green-700 active:bg-green-800 px-1 py-2 flex items-center text-center rounded-sm w-full"
      onClick={onClick}
    >
      <p className="flex-1 text-white">
        <strong>{text}</strong>
      </p>
    </div>
  );
};

export default Button;
