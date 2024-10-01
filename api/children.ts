// const BASE_URL = 'http://localhost:3001';

// export const fetchChildren = async () => {
//   const response = await fetch(`${BASE_URL}/children`);
//   if (!response.ok) {
//     throw new Error('Failed to fetch children');
//   }
//   return response.json();
// };

// export const addChild = async (child: { name: string; checkedIn: boolean; checkInTime: string }) => {
//   const response = await fetch(`${BASE_URL}/children`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(child),
//   });
//   if (!response.ok) {
//     throw new Error('Failed to add child');
//   }
//   return response.json();
// };

// export const updateChild = async (id: number, updates: Partial<{ name: string; checkedIn: boolean; checkInTime: string }>) => {
//   const response = await fetch(`${BASE_URL}/children/${id}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(updates),
//   });
//   if (!response.ok) {
//     throw new Error('Failed to update child');
//   }
//   return response.json();
// };

// export const deleteChild = async (id: number) => {
//   const response = await fetch(`${BASE_URL}/children/${id}`, {
//     method: 'DELETE',
//   });
//   if (!response.ok) {
//     throw new Error('Failed to delete child');
//   }
//   return response.json();
// };

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

const BASE_URL = 'http://localhost:3001';

export const fetchChildren = async () => {
  const response = await fetch(`${BASE_URL}/children`);
  if (!response.ok) {
    throw new Error('Failed to fetch children');
  }
  return response.json();
};

export const addChild = async (child: { name: string; checkedIn: boolean; checkInTime: string }) => {
  const response = await fetch(`${BASE_URL}/children`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(child),
  });
  if (!response.ok) {
    throw new Error('Failed to add child');
  }
  return response.json();
};

export const updateChild = async (id: number, updates: Partial<Child>) => {
  const response = await fetch(`${BASE_URL}/children/${id}`, {
    method: 'PATCH', // Använd PATCH för att uppdatera endast de angivna fälten
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  });
  if (!response.ok) {
    throw new Error('Failed to update child');
  }
  return response.json();
};

export const deleteChild = async (id: number) => {
  const response = await fetch(`${BASE_URL}/children/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete child');
  }
  return response.json();
};
