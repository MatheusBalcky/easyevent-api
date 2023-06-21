export function objIsEmpty(obj: object) {
  for (let item in obj) {
    return false;
  }
  return true;
}
