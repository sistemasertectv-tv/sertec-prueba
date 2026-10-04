import React from 'react';

interface SertecLogoProps {
  className?: string;
  /** Altura Tailwind del logo (por defecto responsive) */
  imgClassName?: string;
  priority?: boolean;
}

/** Logo propio (public/brand/sertec-logo.webp) con transparencia: sin filtros CSS ni dependencia de Cloudinary. */
export const SertecLogo: React.FC<SertecLogoProps> = ({
  className = '',
  imgClassName = 'h-9 sm:h-10',
  priority = false,
}) => (
  <span className={`inline-flex items-center select-none ${className}`}>
    <img
      src="/brand/sertec-logo.webp"
      width={1049}
      height={230}
      alt="SERTEC Telecomunicaciones y Seguridad"
      decoding="async"
      loading={priority ? 'eager' : 'lazy'}
      draggable={false}
      className={`${imgClassName} w-auto object-contain`}
    />
  </span>
);

export default SertecLogo;
