import React, { useState } from "react";
import axios from "axios";

function Bitly() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleClick = () => {
    axios
      .post(
        "https://api-ssl.bitly.com/v4/shorten",
        {
          long_url: longUrl,
        },
        {
          headers: {
            Authorization: `Bearer 73e7701cb6e9bbc4ad232de321dd59a730152b34`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setShortUrl(response.data.link);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <input
        type="text"
        value={longUrl}
        onChange={(event) => setLongUrl(event.target.value)}
      />
      <button onClick={handleClick}>Shorten URL</button>
      {shortUrl && (
        <a href={shortUrl} target="_blank" rel="noopener noreferrer">
          {shortUrl}
        </a>
      )}
    </div>
  );
}

export default Bitly;
