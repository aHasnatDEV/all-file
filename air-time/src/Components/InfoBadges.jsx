/**
 * InfoBadges Component
 * @component
 * @param {Object} props - The component's properties.
 * @param {string} props.title - The text content of the badge title.
 * @param {string} props.value - The badge value.
 * @returns {JSX.Element} The InfoBadges component.
 * 
 * @example
 * // Example usage of InfoBadges component:
 * <InfoBadges text="New" style="badge-new" />
 */
export default function InfoBadges({ title, value }) {
  return (
    <div className='flex border-2 border-slate-500 rounded'>
      <h4 className="bg-slate-500 py-1 px-4 text-white">{title}</h4>
      <p className="py-1 px-4">{value}</p>
    </div>
  );
}
