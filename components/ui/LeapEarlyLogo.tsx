import Image from "next/image";

export function LeapEarlyLogo() {
  return (
    <div className="flex items-center">
      <Image
        src="/LeapEarlyLogo.png"
        alt="Leap Early Years"
        width={120}
        height={40}
        className="h-10 w-auto"
      />
    </div>
  );
}
