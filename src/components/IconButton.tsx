"use client";

import Link from "next/link";
import "../styles/IconButton.css"; // CSS ファイルをインポート

interface IconButtonProps {
  href: string;
  icon?: React.ReactNode;
  className?: string;
  ariaLabel?: string;
  disabled?: boolean;
  enabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export default function IconButton({
  href,
  icon,
  ariaLabel,
  className = "",
  disabled = false,
  enabled = false,
  onClick,
}: IconButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    if (onClick) {
      onClick(e);
    }
  };

  return (
    <Link
      href={href}
      className={`icon-button ${disabled ? "disabled" : ""} ${enabled ? "enabled" : ""} ${className}`}
      aria-label={ariaLabel}
      aria-disabled={disabled}
      onClick={handleClick}
    >
      {icon}
    </Link>
  );
}
