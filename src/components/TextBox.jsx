export default function TextBox({
  placeholder,
  type = "text",
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="
        w-84.5
        h-18.75
        text-[21.357px]
        text-[#575757]
        rounded-2xl
        border-2
        border-[#B1B1B1]
        bg-[#F2F2F2]
        px-4
        py-3
        outline-none
        font-signika
        placeholder:text-[#B0B0B0]
        placeholder:text-[21.357px]
        placeholder:font-signika
        m-2.5
      "
    />
  );
}