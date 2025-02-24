export const registerUser = async (userData) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/user/registeruser`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
        credentials: "include",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Registration failed");
    }

    if (data.userExist) {
      throw new Error("User already exists");
    }

    console.log("data: ", data);

    return data; // Returning the full data object instead of just `data.data`
  } catch (error) {
    throw error;
  }
};
