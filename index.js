document.addEventListener("DOMContentLoaded", () => {
  const btnLoadUser = document.getElementById("load-user");

  const userData = (imageUrl, nodeId) => {
    return `
        <div class="container-user-info">
            <img style='width:100px;' src="${imageUrl}" alt="user image">
            <h3>Node Id: ${nodeId}</h3>
        </div>    
        `;
  };

  const getUser = async (loadTimes) => {
    const res = await fetch("https://api.github.com/users");
    const users = await res.json();

    const allUsers = users.map((user) => ({
      imgUrl: user.avatar_url,
      nodeId: user.node_id,
    }));

    const usesToLoad = loadTimes * 5;

    return usesToLoad <= allUsers.length
      ? allUsers.filter((user, index) =>
          index >= usesToLoad - 5 && index < usesToLoad ? true : false
        )
      : null;
  };

  btnLoadUser.addEventListener("click", loadUser);

  async function loadUser(click) {
    const clickedTimes = ++btnLoadUser.dataset.click;

    const users = await getUser(clickedTimes);
    let output = "";
    const usersHtml = users.forEach((user) => {
      output += userData(user.imgUrl, user.nodeId);
    });
    document
      .getElementById("container-user")
      .insertAdjacentHTML("beforeend", output);
  }
});
