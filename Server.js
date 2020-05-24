const http = require('http');
const fs = require('fs');
const parser = require('@polka/url');
const mime = require('mime/lite');
const { join, resolve } = require('path');

// const requestHandler = (req, res) => {
// 	let url = req.url === '/' ? '/index.html' : req.url;
// 	fs.readFile(`./public${url}`, function (err, data) {
// 		console.log(req.url);
// 		if (err) {
// 			res.writeHead(404);
// 			res.end(JSON.stringify(err));
// 			return;
// 		}
// 		res.writeHead(200);
// 		res.end(data);
// 		console.log(req.url);
// 	});
// };

const requestHandler = (req, res) => {
	let dir = resolve('public' || '.');

	let stats,
		file,
		uri = decodeURIComponent(req.path || req.pathname || parser(req).pathname);
	let arr = [uri]
		.concat(toAssume(uri, ['html', 'htm']))
		.map((x) => join(dir, x))
		.filter(fs.existsSync);
	while ((file = arr.shift())) {
		stats = fs.statSync(file);
		if (stats.isDirectory()) continue;
		return send(req, res, file, stats, {
			'Content-Type': mime.getType(file),
			'Last-Modified': stats.mtime.toUTCString(),
			'Content-Length': stats.size,
		});
	}
};

function toAssume(uri, extns) {
	let i = 0,
		x,
		len = uri.length - 1;
	if (uri.charCodeAt(len) === 47) {
		uri = uri.substring(0, len);
	}

	let arr = [],
		tmp = `${uri}/index`;
	for (; i < extns.length; i++) {
		x = '.' + extns[i];
		if (uri) arr.push(uri + x);
		arr.push(tmp + x);
	}

	return arr;
}

function send(req, res, file, stats, headers = {}) {
	let code = 200,
		opts = {};

	if (req.headers.range) {
		code = 206;
		let [x, y] = req.headers.range.replace('bytes=', '').split('-');
		let end = (opts.end = parseInt(y, 10) || stats.size - 1);
		let start = (opts.start = parseInt(x, 10) || 0);

		if (start >= stats.size || end >= stats.size) {
			res.setHeader('Content-Range', `bytes */${stats.size}`);
			res.statusCode = 416;
			return res.end();
		}

		headers['Content-Range'] = `bytes ${start}-${end}/${stats.size}`;
		headers['Content-Length'] = end - start + 1;
		headers['Accept-Ranges'] = 'bytes';
	}

	res.writeHead(code, headers);
	fs.createReadStream(file, opts).pipe(res);
}

http.createServer(requestHandler).listen(80, 'localhost');
http.createServer(requestHandler).listen(80, '192.168.1.50');
