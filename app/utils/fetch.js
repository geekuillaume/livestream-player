export function checkOk() {
  return function checkOkInner(data) {
    if (!data.ok) {
      throw new Error(`Status is ${data.status} - ${data.statusText}`);
    }
    return data;
  };
}

export function bodyToJson() {
  return function bodyToJsonInner(data) {
    return data.json();
  };
}
