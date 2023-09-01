export const searchLocation = async (searchText) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${searchText}+Pula&format=json`
    );
    const data = await response.json();
    if (data && data.length > 0) {
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
    return { status: "fail" };
  }
};
