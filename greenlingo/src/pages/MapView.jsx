import React, { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import points from '../data/recyclingPoints'
import './MapView.css'

// 解決 marker 圖示不出問題
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
})

export default function MapView() {
  const [address, setAddress] = useState('')
  const [type, setType] = useState('')
  const [district, setDistrict] = useState('')
  const [wasteTypes, setWasteTypes] = useState([])

  const unique = (key) => [...new Set(points.map(p => p[key]).filter(Boolean))]

  const handleWasteTypeChange = (waste) => {
    setWasteTypes(prev =>
      prev.includes(waste)
        ? prev.filter(w => w !== waste)
        : [...prev, waste]
    )
  }

  const filteredPoints = points.filter(p => {
    const matchAddress = p.address.includes(address)
    const matchType = !type || p.type === type
    const matchDistrict = !district || p.district === district
    const matchWaste = wasteTypes.length === 0 || wasteTypes.every(w => p.waste_type.includes(w))
    return matchAddress && matchType && matchDistrict && matchWaste
  })

  return (
    <div className="map-view-container">
      <h2>📍 環保地圖</h2>

      {/* 篩選區 */}
      <div className="filter-panel">
        <input
          type="text"
          placeholder="輸入地址關鍵字"
          value={address}
          onChange={e => setAddress(e.target.value)}
        />

        <select value={type} onChange={e => setType(e.target.value)}>
          <option value="">全部類型</option>
          {unique('type').map((t, i) => (
            <option key={i} value={t}>{t}</option>
          ))}
        </select>

        <select value={district} onChange={e => setDistrict(e.target.value)}>
          <option value="">全部地區</option>
          {unique('district').map((d, i) => (
            <option key={i} value={d}>{d}</option>
          ))}
        </select>

        <div className="waste-filter">
          {['Metals', 'Paper', 'Plastics', 'Glass Bottles', 'Rechargeable Batteries'].map((w, i) => (
            <label key={i}>
              <input
                type="checkbox"
                checked={wasteTypes.includes(w)}
                onChange={() => handleWasteTypeChange(w)}
              />
              {w}
            </label>
          ))}
        </div>
      </div>

      {/* 地圖區 */}
      <MapContainer center={[22.33, 114.16]} zoom={14} className="leaflet-map">
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {filteredPoints.map((p) => (
          <Marker key={p.id} position={[p.lat, p.lng]}>
            <Popup>
              <strong>{p.address}</strong><br />
              🧾 {p.type}<br />
              🧭 {p.district}<br />
              ♻️ {p.waste_type}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
