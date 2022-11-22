export const getUsername = async () => {
  //Obtenemos la data de la sesión
  //(donde se encuentra el id de usuario con el que identificaremos quién hizo la publicación)
  const location = "http://localhost:3500/home/getUserId";
  const request = await fetch(location, {
    credentials: "include",
  });
  const data = await request.json();
  return data.userid;
};
