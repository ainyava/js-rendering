# JS Rendering
Some server side rendering solutions to dynamically render JavaScript based websites and SPA web applications.

## what is the main goal?
try and find the fastest and most optimized and resource friendly solution to render JavaScript/SPA websites on the server.

## how to run?
1. Install requirements: `npm install`
2. Start express web server `npm start`
3. Use the UI

## how to switch renderer?
for now you can just change `import` statement in `server.mjs` file.

## what are implemented solution/renderers?
- [x] Basic Puppeteer (chrome)
- [x] Optimized Puppeteer (chrome)
- [x] ZombieJS (non-browser/nodejs)

## Todos?
- [ ] Find a solution that requires no execution of javascript (like React renderToString)
- [ ] Implement more UI functions like switch between renderes and benchmarking
