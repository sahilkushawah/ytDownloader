const express = require("express");
const app = express();
const ytdl = require("ytdl-core");
const path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get("/", (req, res) => {
	return res.render("index.ejs");
});

app.get("/get", (req, res) => {
    // Handle logic for /get route here
    // For example, you can send a response or perform some action
    res.send("This is the /get route");
});

app.get("/download", async (req, res) => {
    const v_id = req.query.url.split('v=')[1];
    console.log('v_id', v_id);

    try {
        const info = await ytdl.getInfo(req.query.url);
        console.log('information', info);
        const videoFormats = info.formats.filter(format => format.hasVideo && format.hasAudio);
        console.log('videoFormats', videoFormats);

        if (videoFormats.length > 0) {
            return res.render("download", {
                url: "https://www.youtube.com/embed/" + v_id,
                info: videoFormats
            });
        } else {
            return res.status(404).send('No video format with both video and audio found');
        }
    } catch (error) {
        console.error('Error fetching video information:', error);

        if (error.statusCode === 410) {
            // Handle the specific case of a 410 status code (Gone)
            return res.status(404).send('Video not found');
        } else {
            // Handle other errors
            return res.status(500).send('Error fetching video information');
        }
    }
});

app.listen(7000, () => {
	console.log("Server is running on http://localhost:7000");
});