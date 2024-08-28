# OpenAuth Widget Redirect Application

You need to run this application to test the OpenAuth widget. This application is built with vite that redirects to the OpenAuth widget.

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/aarc-xyz/open-auth-redirect
    ```
2. Navigate to the project directory:
    ```sh
    cd open-auth-redirect
    ```
3. Install dependencies:
    ```sh
    npm install
    ```
4. Refer to the [Environment Variables](#environment-variables) section to configure the environment variables.

5. To start the project, run:
    ```sh
    npm run dev
    ```

## Environment Variables

To configure the environment variables for the project, follow these steps:

1. **Copy the Example Environment File**:
    ```sh
    cp .env.example .env
    ```
    This command creates a new `.env` file in the project root by copying the provided [`.env.example`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fvrajdesai%2FDevelopment%2FAarc%2Fopen-auth-redirect%2F.env.example%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "/Users/vrajdesai/Development/Aarc/open-auth-redirect/.env.example") file.

2. **Edit the `.env` File**:
    Open the newly created `.env` file in your preferred text editor. Replace the placeholder values with your actual configuration values. Get `VITE_AARC_AUTHENTICATE_URL` and `VITE_AARC_STAGING_AUTHENTICATE_URL` by running [Open Auth Backend](https://github.com/aarc-xyz/service-open-auth-backend). `VITE_TG_BOT_NAME` is used for authenticating with Telegram.
    ```env
    VITE_AARC_AUTHENTICATE_URL=
    VITE_AARC_STAGING_AUTHENTICATE_URL=
    VITE_TG_BOT_NAME=
    ```

3. **Save the Changes**:
    After updating the values, save the `.env` file. These environment variables will now be loaded when you start the application.


## Usage

The project will be available at `http://localhost:5173` or next available port if 5173 is already in use.

Once the project is running, add the `url` to `redirectUrl` while configuring `auth-widget`. This application's sole purpose is to redirect to the OpenAuth widget and is not meant to be used as a standalone application. You can learn about [auth-widget](https://github.com/aarc-xyz/open-auth-monorepo)

```js
  const config: AarcAuthWidgetConfig = {
    // remaining config...
    urls: {
      stytchUrls: {
        prod: "YOUR_STYTCH_PROD_URL",
        staging: "https://test.stytch.com/",
      },
      pollUrls: {
        prod: "YOUR_BACKEND_PROD_URL",
        staging: "YOUR_BACKEND_STAGING_URL",
      },
      publicToken: {
        prod: "YOUR_STYTCH_PROD_PUBLIC_TOKEN",
        staging: "YOUR_STYTCH_STAGING_PUBLIC_TOKEN",
      },
      redirectUrl: {
        // replace it with your running app url, it won't work with localhost so you can use tunneling services like ngrok. 
        prod: "RUNNING_APP_URL", 
        staging: "RUNNING_APP_URL",
      },
    },
  };
```


