import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const unitsByIssuedYear: { [key: string]: number } = {};
    const unitsByConstructionYear: { [key: string]: number } = {};
    const permitStatusCounts: { [key: string]: number } = {};
    let projectCount = 0;
    let offset = 0;
    let hasMoreRecords = true;

    while (hasMoreRecords) {
      const url = `https://services.arcgis.com/ZOyb2t4B0UYuYNYH/ArcGIS/rest/services/Built_Units_Past_Decade/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json&resultRecordCount=2000&resultOffset=${offset}`;
      console.log('Attempting to fetch from URL:', url);
      const response = await fetch(url);
      const data = await response.json();

      if (data.error) {
        console.error('API returned an error:', data.error);
        return NextResponse.json({ error: 'API returned an error' }, { status: 500 });
      }

      if (!data.features || !Array.isArray(data.features)) {
        console.error('Unexpected API response structure:', data);
        return NextResponse.json({ error: 'Unexpected API response structure' }, { status: 500 });
      }

      data.features.forEach((feature: any) => {
        const issueDate = new Date(feature.attributes.ISS_DATE);
        const constructionDate = new Date(feature.attributes.FINAL_DATE);
        const netUnits = feature.attributes.NET_UNITS || 0;
        const permitStatus = feature.attributes.STATUS || 'Unknown';

        const issueYear = issueDate.getFullYear().toString();
        const constructionYear = constructionDate.getFullYear().toString();
        
        unitsByIssuedYear[issueYear] = (unitsByIssuedYear[issueYear] || 0) + netUnits;
        unitsByConstructionYear[constructionYear] = (unitsByConstructionYear[constructionYear] || 0) + netUnits;
        permitStatusCounts[permitStatus] = (permitStatusCounts[permitStatus] || 0) + 1;
        projectCount++;
      });

      hasMoreRecords = data.features.length === 2000;
      offset += 2000;
    }

    console.log('Units by issued year:', unitsByIssuedYear);
    console.log('Units by construction year:', unitsByConstructionYear);
    console.log('Permit status counts:', permitStatusCounts);
    console.log('Total number of projects analyzed:', projectCount);

    return NextResponse.json({ unitsByIssuedYear, unitsByConstructionYear, permitStatusCounts, projectCount });
  } catch (error) {
    console.error('Error fetching ArcGIS data:', error);
    return NextResponse.json({ error: 'Failed to fetch ArcGIS data' }, { status: 500 });
  }
}
