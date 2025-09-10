import QRCode from 'react-qr-code'

export function QRCodeDisplay({ value }: { value: string }) {
  return (
    <div className="bg-white p-2 rounded">
      <QRCode value={value} size={96} />
    </div>
  )
}
