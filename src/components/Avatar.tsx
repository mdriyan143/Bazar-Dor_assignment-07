"use client";

import { useState } from "react";

interface AvatarProps {
  name?: string | null;
  image?: string | null;
  size?: number;
}

const Avatar = ({ name, image, size = 36 }: AvatarProps) => {
  const [failed, setFailed] = useState(false);
  const initial = (name?.trim()?.[0] ?? "?").toUpperCase();

    if (image && !failed) {
    return (
      <img
        src={image}
        alt={name ?? "ব্যবহারকারী"}
        width={size}
        height={size}
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
        className="shrink-0 rounded-lg object-cover"
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <span
      className="bg-primary/10 text-primary grid shrink-0 place-items-center rounded-lg font-bold"
      style={{ width: size, height: size, fontSize: size * 0.42 }}
      aria-hidden="true"
    >
      {initial}
    </span>
  );
};

export default Avatar;