export const ValidURLConvert = (name) => {
  const url = name?.toString()?.replaceAll(" ","-")?.replaceAll(",","-")?.replaceAll("&","-");
  return url;
}
