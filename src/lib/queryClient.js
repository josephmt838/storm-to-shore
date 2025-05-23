import { QueryClient } from "@tanstack/react-query";
import { 
  getPublicApprovedPrayers, 
  getAllPrayers, 
  getAllContactMessages,
  addPrayerRequest,
  addContactMessage,
  updatePrayerStatus
} from "./mockData.js";

// Mock API functions using local data
export const mockApiRequest = async (method, path, body) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  if (path === "/api/prayer-requests/public") {
    return { json: () => Promise.resolve(getPublicApprovedPrayers()) };
  }
  
  if (path === "/api/prayer-requests") {
    if (method === "GET") {
      return { json: () => Promise.resolve(getAllPrayers()) };
    }
    if (method === "POST") {
      const newPrayer = addPrayerRequest(body);
      return { json: () => Promise.resolve(newPrayer) };
    }
  }
  
  if (path === "/api/contact") {
    if (method === "GET") {
      return { json: () => Promise.resolve(getAllContactMessages()) };
    }
    if (method === "POST") {
      const newMessage = addContactMessage(body);
      return { json: () => Promise.resolve(newMessage) };
    }
  }
  
  if (path.startsWith("/api/prayer-requests/") && path.endsWith("/status") && method === "PATCH") {
    const id = parseInt(path.split("/")[3]);
    const updatedPrayer = updatePrayerStatus(id, body.status);
    return { json: () => Promise.resolve(updatedPrayer) };
  }
  
  throw new Error(`Unknown API endpoint: ${method} ${path}`);
};

export const apiRequest = mockApiRequest;

export const getQueryFn = () => {
  return async ({ queryKey }) => {
    const response = await mockApiRequest("GET", queryKey[0]);
    return response.json();
  };
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn(),
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});