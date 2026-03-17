import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { districts } from '../data/districts';
import { useTranslation } from 'react-i18next';

// Custom icon for districts
const createDistrictIcon = (color = 'var(--primary-color)') => {
  return L.divIcon({
    html: `<img src="./logo/butterfly.png" alt="District Icon" style="width: 100%; height: 100%; border-radius: 50%;" />`,
    iconSize: [30, 30],
    className: 'district-marker'
  });
};

const BangladeshMap = ({ selectedDistrict, onDistrictSelect }) => {
  const { i18n } = useTranslation();
  // Bangladesh center coordinates
  const bangladeshCenter = [23.6850, 90.3563];
  const mapZoom = 7;
  let getDistrictData= (district) => {
    return {
      name: i18n.language === 'bn' ? district.namebn : district.name,
      underDivision: i18n.language === 'bn' ? `${district.underDivisionbn}` : `${district.underDivision}`,
      totalMembers: i18n.language === 'bn' ? `সদস্য: ${district.totalMembersbn}` : `Members: ${district.totalMembers}`,
    };
  }
  return (
    <div className="map-container">
      <MapContainer
        center={bangladeshCenter}
        zoom={mapZoom}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {districts.map((district) => {
          const coords = district.mapCoordinate;
          if (!coords) return null;
          
          const isSelected = selectedDistrict?.id === district.id;
          const iconColor = isSelected ? 'var(--accent-color)' : 'var(--primary-color)';
          
          return (
            <Marker
              key={district.id}
              position={coords}
              icon={createDistrictIcon(iconColor)}
              eventHandlers={{
                click: () => onDistrictSelect(district)
              }}
            >
              <Popup>
                <div className="district-popup">
                  <h6 style={{ margin: '0 0 8px 0', fontWeight: 'bold' }}>
                    {getDistrictData(district).name}
                  </h6>
                  <p style={{ margin: '5px 0', fontSize: '12px' }}>
                     {getDistrictData(district).underDivision}
                  </p>
                  <p style={{ margin: '5px 0', fontSize: '12px' }}>
                    {getDistrictData(district).totalMembers}
                  </p>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default BangladeshMap;
