export default function Button({
  text,
  onClick,
  type = "button",
  className = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        flex
        h-15
        w-76.5
        items-center
        justify-center
        gap-[11.8px]
        rounded-[59px]
        bg-[#FF5E33]
        p-[11.8px]

        font-squadaOne
        text-[32.246px]
        text-white

        ${className}
      `}
    >
      {text}
    </button>
  );
}