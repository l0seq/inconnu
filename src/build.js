import { build } from "esbuild";
import dts from "npm-dts";
const sharedConfig = {
    entryPoints: ["src/index.ts"],
    bundle: true,
    minify: true,
}

new dts.Generator({
    entry: "src/index.ts",
    output: "dist/index.d.ts"
}).generate()


build({
    ...sharedConfig,
    outfile: "dist/index.js",
    platform: "neutral",
    format: "esm"
})