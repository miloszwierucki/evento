export const getAccessToken = async () => {
  try {
    const response = await fetch("/access-token", {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Bad response");
    }
    const json = await response.json();

    return json;
  } catch (err) {
    console.log("K*rwa błąd", err);
  }
};
