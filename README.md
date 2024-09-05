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

6. Configure `Redirect URL` in [Stytch dashboard](https://stytch.com/dashboard) to your running app URL like `http://localhost:5173/auth?state={}`


## Environment Variables

To configure the environment variables for the project, follow these steps:

1. **Copy the Example Environment File**:
    ```sh
    cp .env.example .env
    ```
    This command creates a new `.env` file in the project root by copying the provided `.env.example` file.

2. **Edit the `.env` File**:
    Open the newly created `.env` file in your preferred text editor. Replace the placeholder values with your actual configuration values. Get `VITE_AUTHENTICATE_URL` and `VITE_STAGING_AUTHENTICATE_URL` by running [Open Auth Backend](https://github.com/aarc-xyz/service-open-auth-backend). `VITE_TG_BOT_NAME` is used for authenticating with Telegram.
    ```env
    VITE_AUTHENTICATE_URL="YOUR_BACKEND_PROD_URL/authenticate/"
    VITE_STAGING_AUTHENTICATE_URL="YOUR_BACKEND_STAGING_URL/authenticate/"
    VITE_TG_BOT_NAME="YOUR_TELEGRAM_BOT_NAME"
    ```

3. **Save the Changes**:
    After updating the values, save the `.env` file. If your project is already running, you may need to restart it for the changes to take effect.

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

## License

This project is licensed under the Apache License, Version 2.0. See the [LICENSE](LICENSE) file for more details.