import './App.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import grid from './grid.png'
import { Spin } from 'antd'
import { convertToUrl } from './utils'


function App() {

  let currentPath = window.location.pathname;
  const [loading, setLoading] = useState(false)
  const search = window.location.href;
  let urlParams = new URLSearchParams(search.split('?')[1]);
  const parsedUrl = new URL(search);
  const hash = parsedUrl.hash.substring(1);
  const nativeAuthParams = new URLSearchParams(hash);
  let isGoogleNative = nativeAuthParams.get('state');


  if (urlParams.get('state') == "{") {
    urlParams = new URLSearchParams(convertToUrl(search).split('?')[1]);
  }


  let state: any = isGoogleNative ? JSON.parse(isGoogleNative) : JSON.parse(urlParams.get('state') || '{ "provider": "tes", "session_identifier": "tes"}')

  if (typeof state == 'string') {
    state = JSON.parse(state)
  }

  const url = state.env == 'prod' ? import.meta.env.VITE_AUTHENTICATE_URL : import.meta.env.VITE_STAGING_AUTHENTICATE_URL

  useEffect(() => {

    window.localStorage.setItem('tabClosed', 'false');

    const env = state.env

    const stytch_token_type = urlParams.get('stytch_token_type')

    const currentPath = window.location.pathname;
    if (currentPath.indexOf('/telegram') !== -1) {

      const script = document.createElement('script');
      script.async = true;
      script.src = "https://telegram.org/js/telegram-widget.js?22";
      script.setAttribute('data-telegram-login', import.meta.env.VITE_TG_BOT_NAME);
      script.setAttribute('data-size', 'large');
      script.setAttribute('data-onauth', 'onTelegramAuth(user)');
      script.setAttribute('data-request-access', 'write');

      document.body.appendChild(script);
      //@ts-ignore
      window.onTelegramAuth = (user) => {
        setLoading(true)
        const body = {
          "provider": "telegram",
          "session_identifier": state.session_identifier,
          "chainId": state.chainId,
          "telegram_session": user
        }
        axios.post(url, body, {
          headers: {
            "Request-Source": state?.requestSource,
          }

        }).then(() => {
          if (env == 'prod')
            window.close()


        }).catch((err) => {
          if (env == 'prod')
            window.close()

          console.log(err)

        })
      };

      return () => {
        document.body.removeChild(script);
      };
    } if (state.provider == "twitter") {
      const body = {
        "provider": "x",
        "session_identifier": state.session_identifier,
        "x_session": {
          "oauth_token": urlParams.get('oauth_token'),
          "oauth_verifier": urlParams.get('oauth_verifier'),
        },
        "chainId": state.chainId
      }
      axios.post(url, body, {
        headers: {
          "Request-Source": state?.requestSource,
        }

      }).then((res) => {
        if (res.data.code == 200) {
          if (env == 'prod') {
            window.close()
          }
        }
      }
      ).catch((err) => {
        if (env == 'prod') {
          window.close()
        }
        console.log(err)

      }).finally(() => {
      })
    } else {
      setTimeout(() => {
        const chainId = state.chainId
        const body: any = {
          "provider": state.provider,
          "session_identifier": state.session_identifier,
          "authKey": urlParams.get('token') || nativeAuthParams.get('access_token'),
          chainId: chainId,
        }

        axios.post(url, body, {
          headers: {
            "Request-Source": state?.requestSource,

          }

        }).then((res) => {
          if (stytch_token_type == 'oauth' && res.data.code == 200) {
            if (env == 'prod') {
              window.close()
            }
          }
        }
        ).catch((err) => {
          if (env == 'prod') {
            window.close()
          }
          console.log(err)

        }).finally(() => {
        })
      }
        , 2000)
    }
  }, []);


  if (currentPath.indexOf('/telegram') !== -1) {
    return (
      <>
        {
          loading ? <Spin>
            <div
              style={{
                height: "100vh",
                width: "100vw",
                background: `url(${grid})`,
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
              }}
            >
            </div>
          </Spin> :
            <div
              style={{
                height: "100vh",
                width: "100vw",
                background: `url(${grid})`,
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
              }}
            >
              {loading && <Spin style={{ marginBottom: "200px" }} />}
            </div>
        }
      </>
    )
  }


  return (
    <div
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        height: '100vh',
        width: '100vw',
      }}
    >
      <div className="loader"></div>
      <div>Authenticating. Please wait...</div>
    </div>
  )
}

export default App
