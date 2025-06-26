export function parseSpecs(description) {
  if (!description) return [];
  const rows = [];
  const lines = description.split(/\r?\n/);
  let currentKey = null;
  let currentValue = [];

  for (const line of lines) {
    if (line.includes("\t")) {
      // Lưu lại thông số trước đó nếu có
      if (currentKey) {
        rows.push({
          name: currentKey,
          value: currentValue.length > 1 ? currentValue : currentValue[0] || "",
        });
      }
      const [key, val] = line.split("\t");
      currentKey = key.trim();
      currentValue = val && val.trim() ? [val.trim()] : [];
    } else if (currentKey) {
      if (line.trim()) currentValue.push(line.trim());
    }
  }
  if (currentKey) {
    rows.push({
      name: currentKey,
      value: currentValue.length > 1 ? currentValue : currentValue[0] || "",
    });
  }
  return rows;
}