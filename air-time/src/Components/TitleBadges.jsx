/**
 * TitleBadges Component
 * @component
 * @param {Object} props - The component's properties.
 * @param {string} props.text - The text content of the badge.
 * @param {string} props.style - The CSS class or style for the badge.
 * @returns {JSX.Element} The TitleBadges component.
 * 
 * @example
 * // Example usage of TitleBadges component:
 * <TitleBadges text="New" style="badge-new" />
 */
export default function TitleBadges({ text, style }) {
  return (
    <div className={style}>
      <h4>{text}</h4>
    </div>
  );
}
