export const msToTime = (ts: number) => {
  const sec = Math.round((ts / 1000) % 60);
  const min = Math.round((ts / (60 * 1000)) % 60);
  if (min === 0) {
    return `${sec} second${sec === 1 ? "" : "s"}`;
  }
  return `${min} minute${min === 1 ? "" : "s"}`;
};
