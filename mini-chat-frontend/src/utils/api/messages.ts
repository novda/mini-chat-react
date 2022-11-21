const dataUrl = "http://localhost:4000";

const getMessage = async () => {
  const res = await fetch(`${dataUrl}/messages`);
  const data = await res.json();
  return data;
};

export default getMessage;
