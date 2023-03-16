import React, { useState } from "react";
import "./bitly.css";

function Bitly() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const charMatches = (string, char) => {
    const arr = string.split("");
    return arr.filter((c) => c === char).length;
  }

  const completeUrl = (url) => {
    let newUrl = "";
    if (!url.startsWith("http")) {
      newUrl = "http://";
    }
    if (charMatches(url, ".") < 2) {
      newUrl = newUrl + "www.";
    }
    newUrl = newUrl + url;
    return newUrl;
  }

  const handleClickToShort = () => {
    let readyUrl = completeUrl(longUrl);
    console.log(readyUrl);
    fetch("https://api-ssl.bitly.com/v4/shorten", {
      method: "POST",
      headers: {
        Authorization: `Bearer 73e7701cb6e9bbc4ad232de321dd59a730152b34`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        long_url: readyUrl,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.description === "The value provided is invalid.") {alert("Url is not valid!")}
        else
          setShortUrl(data.link);
      })
      .catch((error) => {
        console.log(error);
        
      });
  };

  const handleClicktoCopy = () => {
    navigator.clipboard.writeText(shortUrl);
  }

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
              <>
              <div className="inputbox">
                <input 
                  className="shorturl" 
                  type="text"
                  value={shortUrl}
                />
                <label htmlFor="">Short URL</label>
              </div>
              <button type="button" onClick={handleClicktoCopy}>Copy URL</button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

export default Bitly;
