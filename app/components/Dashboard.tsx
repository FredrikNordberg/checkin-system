"use client"

import React, { useEffect, useState } from 'react';
import { fetchChildren } from '../../api/children';

type Child = {
  id: number;
  name: string;
  checkedIn: boolean;
  checkInTime: string;
};

const Dashboard: React.FC = () => {
  const [children, setChildren] = useState<Child[]>([]);
  const [checkedInCount, setCheckedInCount] = useState(0);
  const [checkedOutCount, setCheckedOutCount] = useState(0);

  useEffect(() => {
    const getChildren = async () => {
      try {
        const data = await fetchChildren();
        setChildren(data);
        setCheckedInCount(data.filter((child: { checkedIn: any; }) => child.checkedIn).length);
        setCheckedOutCount(data.filter((child: { checkedIn: any; }) => !child.checkedIn).length);
      } catch (error) {
        console.error('Failed to fetch children:', error);
      }
    };

    getChildren();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Overview Section */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Översikt</h2>
          <p>Antal incheckade barn: {checkedInCount}</p>
          <p>Antal utcheckade barn: {checkedOutCount}</p>
        </div>

        {/* Recent Check-ins Section */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Senaste incheckningar</h2>
          <ul>
            {children.filter(child => child.checkedIn).slice(0, 8).map(child => (
              <li key={child.id}>{child.name} - {child.checkInTime}</li>
            ))}
          </ul>
        </div>

        {/* Quick Links Section */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Snabba länkar</h2>
          <ul>
            <li><a href="/checkin" className="text-blue-500 hover:underline">Check-in</a></li>
            <li><a href="/checkout" className="text-blue-500 hover:underline">Check-out</a></li>
            <li><a href="/reports" className="text-blue-500 hover:underline">Rapporter</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
