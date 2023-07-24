export const searchLocation = async (searchText) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${searchText} Pula&format=json`
    );
    // treba dodat za pulu samo, gore
    const data = await response.json();
    if (data && data.length > 0) {
      // Assuming the first result is the best match
      const { lat, lon } = data[0];
      return {
        status: "success",
        latitude: +lat,
        longitude: +lon,
      };
    } else {
      return { status: "fail" };
    }
  } catch (error) {
    console.error("Error fetching location:", error);
  }
};
