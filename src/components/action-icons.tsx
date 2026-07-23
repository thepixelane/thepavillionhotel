type IconProps = {
  className?: string;
};

export function PhoneIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="M6.6 3.75h2.05c.47 0 .88.31 1 .77l.86 3.42c.09.38-.04.77-.33 1.02l-1.76 1.46a14.5 14.5 0 0 0 5.18 5.18l1.46-1.76c.25-.29.64-.42 1.02-.33l3.42.86c.46.12.77.53.77 1v2.05c0 .87-.64 1.6-1.5 1.66-.69.05-1.43.05-2.23-.02-2.89-.25-5.61-1.49-7.93-3.81-2.32-2.32-3.56-5.04-3.81-7.93-.07-.8-.07-1.54-.02-2.23.06-.86.79-1.5 1.66-1.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function WhatsAppIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="M20 11.96a8 8 0 0 1-11.86 6.98L4 20l1.11-3.98A8 8 0 1 1 20 11.96Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.2 8.7c.2-.45.4-.46.58-.47h.5c.17 0 .4-.06.62.45.2.47.67 1.63.73 1.75.06.12.1.27.02.43-.08.16-.12.27-.24.42-.12.14-.25.32-.36.43-.12.12-.24.25-.1.49.15.24.64 1.05 1.38 1.7.95.84 1.75 1.1 2 .73.25-.37.4-.61.8-.5.4.12 1.28.6 1.5.71.22.1.37.16.42.26.06.1.06.6-.14 1.18-.2.58-1.2 1.12-1.65 1.17-.45.05-1.1.1-2.02-.27-.56-.22-1.6-.62-2.75-1.68a10.3 10.3 0 0 1-2.43-3.16c-.25-.52-.56-1.34-.56-2.18 0-.84.47-1.67.67-2.12Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function MapIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="m8 19 8-4 4 2V5l-4-2-8 4-4-2v12l4 2Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M16 3v12" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M8 7v12" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}
