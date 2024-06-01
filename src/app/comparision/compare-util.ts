export function equalsIgnoreCase(string1: string, string2: string): boolean {
  return string1?.toUpperCase() === string2?.toUpperCase();
}

export function isSubstring(potentialSubstring: string, checkedString: string): boolean {
  return checkedString.toUpperCase().includes(potentialSubstring.toUpperCase());
}
