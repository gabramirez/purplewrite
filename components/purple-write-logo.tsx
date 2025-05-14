export const PurpleWriteLogo = ({ className = "w-6 h-6" }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="#8b5cf6" stroke="none" />
      <path d="M8 7l8 0" stroke="#ffffff" strokeWidth="1.5" />
      <path d="M8 10l8 0" stroke="#ffffff" strokeWidth="1.5" />
      <path d="M8 13l4 0" stroke="#ffffff" strokeWidth="1.5" />
      <path d="M15 16.5c0 0-1.5 1.5-3 1.5s-3-1.5-3-1.5" stroke="#ffffff" strokeWidth="1.5" />
    </svg>
  )
}
