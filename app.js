function oauthSignIn() {
    // Google's OAuth 2.0 endpoint for requesting an access token
    document.querySelector(".profile-view").style.display = "none";
    var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';
  
    var form = document.createElement('form');
    form.setAttribute('method', 'GET'); 
    form.setAttribute('action', oauth2Endpoint);
  
    // Parameters to pass to OAuth 2.0 endpoint.
    var params = {
        'client_id': '1085249692225-g6f6fuib5k81c89pav60mhc7hl6pfit2.apps.googleusercontent.com',
        'redirect_uri': 'https://google-auth-2-0-alpha.vercel.app/', // Update this with your actual redirect URI
        'response_type': 'token',
        'scope': 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/youtube.readonly',
        'include_granted_scopes': 'true',
        'state': 'pass-through value'
    };
  
    // Add form parameters as hidden input values.
    for (var p in params) {
      var input = document.createElement('input');
      input.setAttribute('type', 'hidden');
      input.setAttribute('name', p);
      input.setAttribute('value', params[p]);
      form.appendChild(input);
    }

    // Add form to page and submit it to open the OAuth 2.0 endpoint.
    document.body.appendChild(form);
    form.submit();
}


let params = {};
let regex = /([^&=]+)=([^&]*)/g;
let m;

while (m = regex.exec(location.href)) {
    params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
}

if (Object.keys(params).length > 0) {
    localStorage.setItem('authInfo', JSON.stringify(params));
}

window.history.pushState({}, document.title, "/" + "profile.html");

let info = JSON.parse(localStorage.getItem('authInfo'));
console.log(info);

if (info && info.access_token) {
    fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
            "Authorization": `Bearer ${info.access_token}`
        }
    })
    .then((data) => data.json())
    .then((info) => {
        console.log(info);
        document.querySelector(".user-req").style.display = "none";
        document.querySelector(".profile-view").style.display = "block";
        document.getElementById("userName").innerHTML += info.name;
        document.getElementById("userImage").setAttribute('src', info.picture);

    })
    .catch((error) => {
        console.error('Error fetching user info:', error);
    });
} else {
    console.error('No access token found in authInfo');
}






function signOut() {
    fetch('https://accounts.google.com/o/oauth2/revoke?token=' + info['access_token'], {
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    .then((response) => {
        if (response.ok) {
            localStorage.removeItem('authInfo'); 
           document.querySelector(".profile-view").style.display = "none";
           document.querySelector(".user-req").style.display = "block"
        }
    })
    .catch((error) => {
        console.error('Error signing out:', error);
    });
}

