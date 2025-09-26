
const Button = ({ value, onClick }) => {
  return (
    <button className={`btn ${value === "DEL" ? "del" : ""}`} onClick={() => onClick(value)}>
      {value}
    </button>
  );
};

export default Button;
