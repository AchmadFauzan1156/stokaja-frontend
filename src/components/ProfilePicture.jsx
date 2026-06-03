import Image from "next/image";

export default function ProfilePicture({
  src = "/Profile.jpg",
  alt = "Profile Picture",
}) {
  return (
    <div
      className="
        w-9.75
        h-9.75
        overflow-hidden
        rounded-full
      "
    >
      <Image
        src={src}
        alt={alt}
        width={56}
        height={56}
        className="w-full h-full object-cover"
        unoptimized={src.startsWith("blob:") || src.startsWith("data:")}
      />
    </div>
  );
}