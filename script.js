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
      repositories(first: 20) {
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
  `).then((res) => console.log(res));

  function queryFetch(query) {
    return fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer a119abe8379b65ae41de47f5574cfcbe62397d6d",
      },
      body: JSON.stringify({
        query: query,
      }),
    }).then((res) => res.json());
  }
});
