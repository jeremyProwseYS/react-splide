const chokidar = require("chokidar");
const { buildExample } = require("./build-example");

chokidar.watch(["./src/**/*.tsx", "./src/**/*.ts"]).on("change", async () => {
  console.log("Building App...");
  await buildExample();
  console.log("Finished");
});
