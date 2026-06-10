interface AdSenseProps {
  client?: string;
  slot: string;
  format?: string;
  responsive?: string;
  style?: React.CSSProperties;
  className?: string;
}

/**
 * AdSense Component - Temporarily disabled to prevent console errors from inactive/placeholder slots.
 * Returns null to keep the page layout clean and free of ad requests.
 */
export function AdSense({}: AdSenseProps) {
  return null;
}
