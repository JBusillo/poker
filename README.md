# poker-svelte

This is a work in progress. I'm developing a poker SPA and server so that my poker group (in Cuenca Ecuador) can play poker remotely during the COVID-19 lockdown.

I started writing the spa using **preact**, but then discovered **svelte**. The SPA uses Socket.Io to communicate with the server.

Server code is under jbusillo/poker-serv

There is a lot of refactoring that can be done -- at this time, I'm coding my the seat of my pants.

This is quite a learning curve for me. Coming from a Microsoft environment (.net, C#, SqlServer), just about everything is a challenge:

- Learning svelte
- Javascript -- especially promises, async/await (trying to keep myself out callback hell)
- Socket.Io
- CSS (media queries, flexbox, grid)
- just about anything else you can think of!

I'm retired, so this is more of a hobby or mental exercise.

There's a lot of debugging to do -- I'm also using puppeteer for multi-player testing -- another challenge.
