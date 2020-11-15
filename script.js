window.addEventListener("DOMContentLoaded", function () {
  let query = `"query" : {
    viewer,
  };`;

  queryFetch(`
  query{
    viewer {
      login
      bio
      name
      avatarUrl
      followers {
        totalCount
      }
      following {
        totalCount
      }
      location
      repositories(first: 20, privacy: PUBLIC) {
        totalCount
        nodes {
          description
          name
          primaryLanguage {
            name
            color
          }
          forks {
            totalCount
          }
          updatedAt
        }
      }
    }
  }  
  `).then((res) => {
    let profilePicture = document.querySelectorAll(".profilePicture");

    for (let i = 0; i < profilePicture.length; i++) {
      profilePicture[i].setAttribute("src", res.data.viewer.avatarUrl);
    }

    let profileName = document.querySelectorAll(".profileName");
    profileName[0].textContent = res.data.viewer.name;
    profileName[1].textContent = res.data.viewer.name;

    let profileNickName = document.querySelectorAll(".profileNickName");
    profileNickName[0].textContent = res.data.viewer.login;
    profileNickName[1].textContent = res.data.viewer.login;

    let profileBio = document.querySelectorAll(".bio");
    profileBio[0].textContent = res.data.viewer.bio;
    profileBio[1].textContent = res.data.viewer.bio;

    let repoTab = document.querySelector(".repoTab");
    repoTab.textContent = res.data.viewer.repositories.totalCount;

    let repositoriesBox = document.querySelector(".repositories");
    for (let i = 0; i < res.data.viewer.repositories.nodes.length; i++) {
      repositoriesBox.appendChild(
        createRepoView(res.data.viewer.repositories.nodes[i])
      );
    }
  });

  function queryFetch(query) {
    return fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer f33fe5cdd6ce46f37e26a6d7722086c03b0b60d0",
      },
      body: JSON.stringify({
        query: query,
      }),
    }).then((res) => res.json());
  }

  function createRepoView(repo) {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    langColor = repo.primaryLanguage?.color;
    let date = new Date(repo.updatedAt);

    let flexBox = document.createElement("div");
    let div = document.createElement("div");
    let h3 = document.createElement("h3");
    let a = document.createElement("a");
    let flexBox2 = document.createElement("div");
    let color = document.createElement("span");
    let lang = document.createElement("span");
    let lastUpdate = document.createElement("span");
    let button = document.createElement("button");
    let i = document.createElement("i");

    a.setAttribute("href", "#");
    a.textContent = repo.name;
    h3.appendChild(a);

    color.setAttribute("class", "color");
    color.setAttribute("style", `background: ${langColor}`);

    lang.setAttribute("class", "lang");
    lang.textContent = repo.primaryLanguage?.name;

    lastUpdate.setAttribute("class", "last-update");
    lastUpdate.textContent = `Updated on ${
      monthNames[date.getMonth()]
    } ${date.getDay()}`;

    flexBox2.setAttribute("class", "flex-box");
    flexBox2.appendChild(color);
    if (repo.primaryLanguage?.name) flexBox2.appendChild(lang);
    flexBox2.appendChild(lastUpdate);

    div.appendChild(h3);
    div.appendChild(flexBox2);

    button.setAttribute("class", "star btn-default");
    i.setAttribute("class", "far fa-star");

    button.appendChild(i);
    button.append("Star");

    flexBox.setAttribute("class", "flex-box repo border-bt");
    flexBox.appendChild(div);
    flexBox.appendChild(button);

    return flexBox;
  }
});
