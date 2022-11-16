const formatearFecha = (date) => {
  let year_ = date.getFullYear();
  //El +1 es porque getMonth retorna valores del 0 al 11
  let month_ =
    date.getMonth() + 1 < 10
      ? `0${date.getMonth() + 1}`
      : `${date.getMonth() + 1}`;
  let date_ = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
  let hours_ =
    date.getHours() < 10 ? `0${date.getHours()}` : `${date.getHours()}`;
  let minutes_ =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`;
  return `${date_}/${month_}/${year_}, ${hours_}:${minutes_}.`;
};

export default formatearFecha;
