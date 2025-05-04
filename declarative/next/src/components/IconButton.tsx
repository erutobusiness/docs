'use client';

import { HomeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import '../styles/IconButton.css'; // CSS ファイルをインポート

interface IconButtonProps {
  href: string;
  icon?: React.ReactNode;
  className?: string;
  ariaLabel?: string;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export default function IconButton({
  href,
  icon = <HomeIcon className="w-6 h-6 icon-color" />,
  className = '',
  ariaLabel = 'ホームに戻る',
  disabled = false,
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
      className={`icon-button ${disabled ? 'disabled' : ''} ${className}`}
      aria-label={ariaLabel}
      aria-disabled={disabled}
      onClick={handleClick}
    >
      {icon}
    </Link>
  );
}
