export const accessibilityNeeds = [
  { id: "wheelchair", label: "Wheelchair access", icon: "♿" },
  { id: "toilets", label: "Accessible toilets", icon: "🚻" },
  { id: "signage", label: "Visual info / signage", icon: "👁" },
  { id: "communication", label: "Communication support", icon: "🗨" },
  { id: "parking", label: "Accessible parking", icon: "🅿" },
];

function AccessibilityFilters({ selectedNeeds, onToggle, className, buttonClassName }) {
  return (
    <div className={className} role="group" aria-label="Filter by accessibility need">
      {accessibilityNeeds.map((need) => (
        <button
          key={need.id}
          type="button"
          className={buttonClassName}
          aria-pressed={selectedNeeds.includes(need.id)}
          onClick={() => onToggle(need.id)}
        >
          {need.icon} {need.label}
        </button>
      ))}
    </div>
  );
}

export default AccessibilityFilters;