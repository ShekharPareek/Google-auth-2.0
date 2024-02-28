function oauthSignIn() {
    // Google's OAuth 2.0 endpoint for requesting an access token
    var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';
  
    var form = document.createElement('form');
    form.setAttribute('method', 'GET'); 
    form.setAttribute('action', oauth2Endpoint);
  
    // Parameters to pass to OAuth 2.0 endpoint.
    var params = {
        'client_id': '1085249692225-g6f6fuib5k81c89pav60mhc7hl6pfit2.apps.googleusercontent.com',
        'redirect_uri': 'http://127.0.0.1:3000/profile.html', // Update this with your actual redirect URI
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
