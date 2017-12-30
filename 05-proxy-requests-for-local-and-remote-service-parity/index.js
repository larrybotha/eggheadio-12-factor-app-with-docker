const {join} = require('path');
const express = require('express');
const proxy = require('express-http-proxy');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const baseImgUrl = process.env.BASE_IMG_URL;

const proxyBaseImgUrl = baseImgUrl
  ? // if our environment variable is defined
    proxy(baseImgUrl, {
      proxyReqPathResolver(req) {
        // create a new path to that same image, but on the CDN / wherever
        // it's hosted
        const d = new Date();
        const query = encodeURI(
          `text=proxied at ${d
            .toString()
            .split(' ')
            .slice(4)
            .join(' ')}`
        );
        const newPath = `${baseImgUrl}${req.path}?${query}`;
        console.log(newPath);

        // return that path to be served for the asset
        return newPath;
      },
    })
  : // otherwise serve directly from local
    express.static(join(__dirname, 'public/images'));

// before proxying
// app.use('/images', express.static(join(__dirname, 'public/images')));

// after
app.use('/images', proxyBaseImgUrl);

app.listen(8080);
