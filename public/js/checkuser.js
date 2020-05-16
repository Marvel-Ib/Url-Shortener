async function getSimilarUser(username) {
  let response = await fetch(
    `https://happy-css.com/api/users?limit=1&name=${username}`
  );
  return response.json();
}

async function isUserValid(target) {
  let username = target.value;
  let users = await getSimilarUser(username);
  if (users.length) {
    let existingUsername = users[0].name;
    if (existingUsername == username) {
      target.setCustomValidity(`The user "${username}" already exists`);
      return false;
    }
  }
  target.setCustomValidity("");
  return true;
}

document.getElementById("sh").addEventListener("input", async (e) => {
  e.target.setCustomValidity("uset name active");
  console.log("mehn");
  e.target.reportValidity();
  //let isValid = await isUserValid(e.target)
  // optionally, we can re-use the return value if we need to.
  //e.target.reportValidity()
});
