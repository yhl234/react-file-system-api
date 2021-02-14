## About The Project

This is the backend of [File system](https://github.com/yhl234/react-file-system) project. The goals of this server is formatting sample date to frontend friendly structure

### Built With

- [Express](https://expressjs.com/)
- [Express generator](https://expressjs.com/en/starter/generator.html)
- [Lodash](https://lodash.com/)

### Sample API call

![screenshot](https://raw.githubusercontent.com/yhl234/react-file-system-api/master/images/screenshot.gif)

## Sample data

```js
let root = {
	type: "dir",
	children: {
		home: {
			type: "dir",
			children: {
				myname: {
					type: "dir",
					children: {
						"filea.txt": {
							type: "file",
						},
						"fileb.txt": {
							type: "file",
						},
						projects: {
							type: "dir",
							children: {
								mysupersecretproject: {
									type: "dir",
									children: {
										mysupersecretfile: {
											type: "file",
										},
									},
								},
							},
						},
					},
				},
			},
		},
	},
};
```
