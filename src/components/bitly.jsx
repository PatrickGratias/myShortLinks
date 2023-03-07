import React, { useState } from "react";
import "./bitly.css";

function Bitly() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleClickToShort = () => {
    console.log(longUrl);
    fetch("https://api-ssl.bitly.com/v4/shorten", {
      method: "POST",
      headers: {
        Authorization: `Bearer 73e7701cb6e9bbc4ad232de321dd59a730152b34`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        long_url: longUrl,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setShortUrl(data.link);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <section>
      <div className="form-box">
        <div className="form-value">
          <form action="">
            <h2>Short URL</h2>
            <div className="inputbox">
            <input
              type="text"
              value={longUrl}
              onChange={(event) => setLongUrl(event.target.value)}
            />
            <label htmlFor="">Long URL</label>
            </div>
            <button type="button" onClick={handleClickToShort}>Shorten URL</button>
            {shortUrl && (
              <div className="inputbox">
                <input 
                  className="shorturl" 
                  type="text"
                  value={shortUrl}
                />
                <div className="formbutton">
                  <input 
                    type="button"
                    value="Copy URL"
                    onclick={navigator.clipboard.writeText(shortUrl)}
                    />
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

export default Bitly;
