export const categoryOptions = [
  {
    label: "NewsProduct",
  },
  {
    label: "Itens de Crown",
  },
  {
    label: "Teras servidores NADMO",
  },
  {
    label: "Teras servidores LADMO",
  },
  {
    label: "Itens Servidores Ladmo",
  },
  {
    label: "Dashbot",
  },
  {
    label: "Nenbot",
  },
  {
    label: "Itens de Crown Omegamon LA",
  },
  {
    label: "Itens de Crown Alphamon LA",
  },
];

export async function getCategoryByName(name) {
  const categoryResponse = await fetch("https://api.haxtera.com/category");
  const category = await categoryResponse.json();

  const filterCategory = category.filter((result) => result.name === name);

  return filterCategory[0];
}
