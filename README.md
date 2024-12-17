# Strapi plugin Google Auth Mobile

Google Auth Mobile helps you to create google authentication for your Android and iOS users. It uses the official OAuth2Client from google-auth library for Node JS applications.


# How it works

For Android and iOS applications there is no redirect uri parameter and only Client ID is configured for the app. Google Authentication happens on the device via One Tap for Android or Google Sign-In for iOS and then the client application should send accessToken to the server. 

The server will verify the token via OAuth2Client verifyIdToken() method and then will use email, provided in the payload, to authenticate the user in the strapi application via services of Users & Permissions Plugin. 

If the user is already in the database, an authenticated session for the user is established. If the user isn't yet in the database, a new user record from the information in the ID token payload is created, and a session for the user is established.

More info can be found here: https://developers.google.com/identity/one-tap/android/idtoken-auth


# Features

- Ability to authenticate users via mobile devices using OAuthClientID
- JWT Authentication for users using strapi default user-permission collection
- Secure


# Activate the Plugin

Add the following in config/plugins.js of you strapi application:

```js
module.exports = {
  'google-auth-mobile': {
    enabled: true
  },
};
```

Open the admin panel and you should see Google Auth Mobile in the right menu among other plugins.


# Configuration

1. Create a google project from the [Google Cloud Console](https://console.cloud.google.com/projectcreate?previousPage=%2Fcloud-resource-manager%3Fproject%3D%26folder%3D%26organizationId%3D).

2. Go to [Credentials](https://console.cloud.google.com/apis/credentials), click create credentials -> OAuth Client ID. Application type may be Android or iOS. Do not forget to create OAuth Consent Screen (Nav Menu -> APIs & Services -> [OAuth consent screen](https://console.cloud.google.com/apis/credentials/consent)). 

3. To enable authentication you should input the Client ID of your application in the Google Auth Mobile plugin page and save it, you should also provide platform key to help you identify for which platform your client id was created. Both Client ID and platform key are required and should be uniqie.

4. Google credentials can be set for multiple apps (currently no limitations, although we suggest to not have too many) that should have access to your backend. They can also be set directly in Content-Manager (Content-type "Google Creds").


# How to use

### Authenticate User

We suggest using One Tap for Android
https://developers.google.com/identity/one-tap/android/overview

and Google Sign-In for iOS
https://developers.google.com/identity/sign-in/ios/start 

The client retrieves a Google ID token when the user selects a Google Account. An ID token is a signed assertion of a user's identity that also contains a user's basic profile information, possibly including an email address that has been verified by Google.

After a user successfully signs in, send the user's ID token to your server using HTTPS. Then, on the server, we are verifying the integrity of the ID token and use the user information contained in the token to establish a session (issue a jwt) or create a new account.

```js
    {
        method: 'POST',
        path: 'YOUR_STRAPI_BACKEND_URL/api/google-auth-mobile/connect',
        data: {
          access_token: TOKEN
        }
    }
```

The example response:

```json
{
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6I6pXVCJ9.eyJpZCI6MiwiaWF0Ijox8jk3MTA2OTc1LCJleHAiOjEqOTk2OTg5NzV9.tZ1aYLZpZmAbZGeA3buTVyPdWY5O8GGNp-c2bjlN4kM",
    "user": {
        "id": 1,
        "username": "user",
        "email": "user-example@gmail.com",
        "provider": "google",
        "confirmed": true,
        "blocked": false,
        "createdAt": "2020-10-12T10:35:17.547Z",
        "updatedAt": "2020-10-12T10:35:17.547Z"
    }
}
```

If the token verification fails, the error will be thrown:

```json
{
    "data": null,
    "error": {
        "status": 400,
        "name": "ApplicationError",
        "message": "Invalid google auth token",
        "details": {}
    }
}
```

If no client IDs were set in the plugin menu, the error will be thrown:

```json
{
    "data": null,
    "error": {
        "status": 400,
        "name": "ApplicationError",
        "message": "Client IDs were not set in plugin settings",
        "details": {}
    }
}
```


# Report Bugs/Issues

Any bugs/issues you may face can be submitted as issues in the Github repo.