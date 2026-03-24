export const truncateText = (text: string, maxLength: number): string => {
  if (!text || text.length <= maxLength) return text;
  const sliced = text.slice(0, maxLength);
  return sliced.slice(0, sliced.lastIndexOf(" ")) + "...";
};
