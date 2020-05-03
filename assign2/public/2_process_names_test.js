let NAME_DATA;

const setText = (id, text) => {
  document.querySelector(`#${id}`).textContent = text;
};

const main = () => {
  NAME_DATA = processNames(RAW_NAME_DATA);
  setText("years", NAME_DATA.years.toString());
  setText("nameCount", Object.keys(NAME_DATA.names).length);
  setText("kashifUndef", NAME_DATA.names.Kashif === undefined);
  setText("coleLength", NAME_DATA.names.Cole.length);
  setText("samLength", NAME_DATA.names.Sam.length);
  setText("michaelRank", NAME_DATA.names.Michael[7].rank);
  setText("jessicaCount", NAME_DATA.names.Jessica[4].count);
  setText("nickNull", NAME_DATA.names.Nick[8] === null);
};
main();
