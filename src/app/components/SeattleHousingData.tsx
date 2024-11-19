'use client';

import React, { useEffect, useState } from 'react';

interface UnitsByYear {
  [key: string]: number;
}

interface PermitStatusCounts {
  [key: string]: number;
}

const SeattleHousingData: React.FC = () => {
  const [unitsByIssuedYear, setUnitsByIssuedYear] = useState<UnitsByYear>({});
  const [unitsByConstructionYear, setUnitsByConstructionYear] = useState<UnitsByYear>({});
  const [permitStatusCounts, setPermitStatusCounts] = useState<PermitStatusCounts>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/arcgis');
        const data = await response.json();
        console.log('Fetched data:', data);
        setUnitsByIssuedYear(data.unitsByIssuedYear || {});
        setUnitsByConstructionYear(data.unitsByConstructionYear || {});
        setPermitStatusCounts(data.permitStatusCounts || {});
      } catch (error) {
        console.error('Error fetching ArcGIS data:', error);
      }
    };

    fetchData();
  }, []);

  const renderUnitsByYear = (unitsByYear: UnitsByYear, title: string) => (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-2 text-blue-800">{title}</h3>
      <ul className="space-y-2">
        {Object.entries(unitsByYear).map(([year, units]) => (
          <li key={year} className="bg-blue-100 p-2 rounded">
            <span className="font-semibold text-blue-800">{year}</span>: <span className="text-blue-600">{units} units</span>
          </li>
        ))}
      </ul>
    </div>
  );

  const renderPermitStatusCounts = () => (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-2 text-blue-800">Permit Status Counts</h3>
      <ul className="space-y-2">
        {Object.entries(permitStatusCounts).map(([status, count]) => (
          <li key={status} className="bg-blue-100 p-2 rounded">
            <span className="font-semibold text-blue-800">{status}</span>: <span className="text-blue-600">{count} permits</span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4 text-blue-800">Seattle Housing Units and Permits</h2>
      {renderUnitsByYear(unitsByIssuedYear, "Units by Year of Issued Permit")}
      {renderUnitsByYear(unitsByConstructionYear, "Units by Year of Construction")}
      {renderPermitStatusCounts()}
    </div>
  );
};

export default SeattleHousingData;
