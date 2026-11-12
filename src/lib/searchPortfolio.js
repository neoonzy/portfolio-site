/** Accessible search over the editorial chapters and project catalogue. */
export const normalizeQuery = value =>
  String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase().trim()

export function searchPortfolio(chapters, projects, lang, query) {
  const term = normalizeQuery(query)
  const sectionMatches = chapters.filter(item =>
    normalizeQuery(item[lang] + ' ' + item.shortPt + ' ' + item.shortEn).includes(term))
  const projectMatches = term
    ? projects.filter(item => normalizeQuery([
        item.title, item.category?.[lang], item.description?.[lang],
        item.details?.[lang], item.role?.[lang], ...(item.tags || []),
      ].join(' ')).includes(term))
    : []
  return [
    ...sectionMatches.map(item => ({ ...item, type: 'section', label: item[lang], target: item.id })),
    ...projectMatches.map(item => ({ ...item, type: 'project', label: item.title, target: 'project-' + item.slug })),
  ]
}
