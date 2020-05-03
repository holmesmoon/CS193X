const processNames = (rawData) => {
  let years = Object.keys(rawData);
  let names = {};
  let j = 0;
  for (let y of years) {
    let people = rawData[y];
    let i = 0;
    for (let p of people) {
      let name = p[0];
      let obj = { rank: i, count: p[1] };
      if (!(name in names)) {
        let arr = Array(years.length).fill(null);
        names[name] = arr;
      }
      names[name][j] = obj;
      i++;
    }
    j++;
  }
  return {years,names};
};
