const columns = Array.from({ length: 12 }, (_, index) => index)

export default function LayoutGridOverlay({ enabled }) {
  if (!enabled) return null
  return (
    <div className="layout-grid-overlay" aria-hidden="true">
      <div className="layout-grid-columns">
        {columns.map(index => <span className="layout-grid-column" key={index} />)}
      </div>
      <div className="layout-grid-legend"><span>GRID / 12 COLUMNS</span><span>LEL — 2026</span></div>
    </div>
  )
}
