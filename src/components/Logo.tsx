import Image from "next/image";

export const Logo = ({ className = "h-8 w-8" }: { className?: string }) => (
  <Image
    src="/brand/resumeable-icon.svg"
    alt="Resumeable logo"
    width={747}
    height={696}
    className={className}
  />
);
