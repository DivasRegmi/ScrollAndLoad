//function that make sure that the DOM content load first before executing js
document.addEventListener("DOMContentLoaded", () => {
  //Load button
  const btnLoadUser = document.getElementById("load-user");

  //function to create html to render
  const userData = (imageUrl, nodeId) => {
    return `
        <div class="container-user-info">
            <img style='width:100px;' src="${imageUrl}" alt="user image">
            <h3>Node Id: ${nodeId}</h3>
        </div>    
        `;
  };

  //function to fetch data
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

  //Add event handler to fetch data and Load
  btnLoadUser.addEventListener("click", loadUser);

  //Function that calls to fetch data and add renderd html
  async function loadUser(click) {
    const clickedTimes = ++btnLoadUser.dataset.click;

    // call function to fetch data
    const users = await getUser(clickedTimes);
    let output = "";

    //Call function to Create html to render
    const usersHtml = users.forEach((user) => {
      output += userData(user.imgUrl, user.nodeId);
    });

    //Added loaded content to DOM
    document
      .getElementById("container-user")
      .insertAdjacentHTML("beforeend", output);
  }
});
