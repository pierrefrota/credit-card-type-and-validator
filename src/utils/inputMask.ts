export const inputMask = (value: string, pattern: string, type: string) => {
  let i = 0;
  let lastReplacedIndex = -1;
  let v = "";

  v = value.toString().replace(/\W/g, "");

  if (type === "number") {
    v = value.toString().replace(/[^0-9]/g, "");
  }

  const result = pattern.replace(/\#/g, (_, j) => {
    if (i >= v.length) {
      return "#";
    }

    lastReplacedIndex = j;
    return v[i++] || "";
  });

  return {
    masked: result.substring(0, lastReplacedIndex + 1),
    value: v,
  };
};
