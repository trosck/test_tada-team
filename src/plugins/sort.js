export function byDateAsc(field) {
  return (a, b) => (
    new Date(a[field]) - new Date(b[field])
  )
}
