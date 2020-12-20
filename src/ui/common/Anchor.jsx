const Anchor = ({ children, href }) => {
  return (
    <a href={href} className="underline font-bold hover:text-green-400" target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
};

export default Anchor;
