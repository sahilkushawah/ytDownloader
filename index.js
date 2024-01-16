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
    console.log('v_id',v_id);
    const info = await ytdl.getInfo(req.query.url);
    console.log('ionfo',info);
    const videoFormats = info.formats.filter(format => !format.hasAudio);
    console.log('videoFormats'.videoFormats);

	return res.render("download", {
		url: "https://www.youtube.com/embed/" + v_id,
        info: videoFormats
	});
});
app.listen(7000, () => {
	console.log("Server is running on http://localhost:7000");
});