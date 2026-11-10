const columns = Array.from({ length: 12 }, (_, index) => index)

export default function LayoutGridOverlay({ enabled }) {
  if (!enabled) return null
  return (
    <div className="layout-grid-overlay" aria-hidden="true">
      <div className="layout-grid-columns">
        {columns.map(index => <span className="layout-grid-column" key={index} />)}
      </div>
      <div className="layout-grid-legend">
        <span className="grid-legend-desktop">GRID / 12 COL</span>
        <span className="grid-legend-tablet">GRID / 06 COL</span>
        <span className="grid-legend-mobile">GRID / 04 COL</span>
        <span>LEL — 2026</span>
      </div>
    </div>
  )
}
