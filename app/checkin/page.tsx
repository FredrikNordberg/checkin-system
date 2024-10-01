"use client";
import React, { useState, useEffect } from "react";
import { fetchChildren, updateChild } from "../../api/children";

type Child = {
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

const CheckIn: React.FC = () => {
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

  const handleCheckIn = async (id: number) => {
    const checkInTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    try {
      await updateChild(id, { checkedIn: true, checkInTime });
      setChildren(
        children.map((child) =>
          child.id === id ? { ...child, checkedIn: true, checkInTime } : child
        )
      );
      alert("Barn incheckat!");
    } catch (error) {
      console.error("Error checking in child:", error);
      alert("Misslyckades med att checka in barn");
    }
  };

  const handleCheckOut = async (id: number) => {
    try {
      await updateChild(id, { checkedIn: false, checkInTime: "" });
      // Uppdatera lokala state för att spegla förändringen
      setChildren(
        children.map((child) =>
          child.id === id
            ? { ...child, checkedIn: false, checkInTime: "" }
            : child
        )
      );
      alert("Barn utcheckat!");
    } catch (error) {
      console.error("Error checking out child:", error);
      alert("Misslyckades med att checka ut barn");
    }
  };

  return (
    <div className="container mx-auto p-4">
  <h1 className="text-3xl font-bold py-8 mb-6">MYRAN</h1>
  <table className="min-w-full bg-white">
    <thead>
      <tr>
        <th className="py-2 px-4 border-b text-center">Namn</th>
        <th className="py-2 px-4 border-b text-center">Efternamn</th>
        <th className="py-2 px-4 border-b text-center">Ålder</th>
        <th className="py-2 px-4 border-b text-center">Kön</th>
        <th className="py-2 px-4 border-b text-center">Adress</th>
        <th className="py-2 px-4 border-b text-center">Vårdnadshavare</th>
        <th className="py-2 px-4 border-b text-center">Kontakt</th>
        <th className="py-2 px-4 border-b text-center">Allergier</th>
        <th className="py-2 px-4 border-b text-center">Medicinska Tillstånd</th>
        <th className="py-2 px-4 border-b text-center">Status</th>
        <th className="py-2 px-4 border-b text-center">Handling</th>
      </tr>
    </thead>
    <tbody>
      {children.map((child) => (
        <tr key={child.id}>
          <td className="py-2 px-4 border-b text-center">{child.name}</td>
          <td className="py-2 px-4 border-b text-center">{child.lastName}</td>
          <td className="py-2 px-4 border-b text-center">{child.age}</td>
          <td className="py-2 px-4 border-b text-center">{child.gender}</td>
          <td className="py-2 px-4 border-b text-center">{child.address}</td>
          <td className="py-2 px-4 border-b text-center">{child.guardianName}</td>
          <td className="py-2 px-4 border-b text-center">{child.guardianContact}</td>
          <td className="py-2 px-4 border-b text-center">{child.allergies || "N/A"}</td>
          <td className="py-2 px-4 border-b text-center">
            {child.medicalConditions || "N/A"}
          </td>
          <td className="py-2 px-4 border-b text-center">
            {child.checkedIn ? (
              <span className="text-green-500">
                Incheckad kl {child.checkInTime}
              </span>
            ) : (
              <span className="text-red-500">Ej incheckad</span>
            )}
          </td>
          <td className="py-2 px-4 border-b text-center">
            {child.checkedIn ? (
              <button
                onClick={() => handleCheckOut(child.id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Checka ut
              </button>
            ) : (
              <button
                onClick={() => handleCheckIn(child.id)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Checka in
              </button>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

  );
};

export default CheckIn;
