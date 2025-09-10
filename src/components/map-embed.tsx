export function MapEmbed({ query }: { query: string }) {
  const src = `https://maps.google.com/maps?q=${encodeURIComponent(query)}&t=&z=13&ie=UTF8&iwloc=&output=embed`
  return (
    <div className="w-full overflow-hidden rounded-md border">
      <iframe title="map" className="h-64 w-full" src={src} />
    </div>
  )
}
