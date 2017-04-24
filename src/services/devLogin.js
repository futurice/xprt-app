const fetchDevToken = async () => {
  const responseJson = await fetch('http://localhost:3888/users/authenticate', {
    method: 'POST',
    body: JSON.stringify({
      email: 'foo@bar.com',
      password: 'foobar',
    }),
  }).then(response => response.json());

  return responseJson.token;
};

export default fetchDevToken;
