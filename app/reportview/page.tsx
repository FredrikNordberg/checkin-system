"use client"
import React, { useState, useEffect } from "react";
import { fetchChildren } from "../../api/children";

type Child = {
  checkOutTime: any;
  id: number;
  name: string;
  lastName: string;
  age: number;
  gender: string;
  checkedIn: boolean;
  checkInTime?: string;
  address: string;
  guardianName: string;
  guardianContact: string;
  allergies?: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  medicalConditions?: string;
  notes?: string;
};

const ReportView: React.FC = () => {
  const [children, setChildren] = useState<Child[]>([]); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchChildren();
        setChildren(data);
      } catch (error) {
        console.error("Error fetching children:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold py-8 mb-6">Rapportvy</h1>
      <div className="table-wrapper">
        <table className=" bg-white">
          <thead>
            <tr>
              <th className="sticky top-0 bg-white py-2 px-4 border-b">Namn</th>
              <th className="sticky top-0 bg-white py-2 px-4 border-b">Incheckningstid</th>
              <th className="sticky top-0 bg-white py-2 px-4 border-b">Utcheckningstid</th>
            </tr>
          </thead>
          <tbody>
            {children.map((child) => (
              <tr key={child.id}>
                <td className="py-2 px-4 border-b">{child.name}</td>
                <td className="py-2 px-4 border-b">
                  {child.checkInTime ? child.checkInTime : "Ej incheckad"}
                </td>
                <td className="py-2 px-4 border-b">
                  {child.checkOutTime ? child.checkOutTime : "Ej utcheckad"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportView;



