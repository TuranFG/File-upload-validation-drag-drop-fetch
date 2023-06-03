
async function fetchGitProf() {
    try {
        const response = await fetch("https://api.github.com/users/turanfg");
        const data = await response.json();
        console.log(data);
  
        const name=document.querySelector(".name");
        const userName=document.querySelector(".title");
        const profilePic=document.querySelector(".prof-Pic");
        const followers=document.querySelector(".followers");
        const following=document.querySelector(".following");
        const description=document.querySelector(".desc");
        
        name.innerHTML = data.name;
        userName.innerHTML = data.login;
        followers.innerHTML = data.followers;
        following.innerHTML = data.following;
        description.innerHTML=data.bio;
        profilePic.src = data.avatar_url;
       
    }
        catch (error) {
        console.log("Error:", error);
     }
  }
  
    fetchGitProf();