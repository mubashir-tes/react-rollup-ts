/* eslint-disable import/no-anonymous-default-export */
import babel from "@rollup/plugin-babel";
import image from "@rollup/plugin-image";
import typescript from "@rollup/plugin-typescript";
import { readFileSync } from "fs";
import dts from "rollup-plugin-dts";
import includePaths from "rollup-plugin-includepaths";
import json from "rollup-plugin-json";

const pkg = JSON.parse(
  readFileSync(new URL("./package.json", import.meta.url), "utf8")
);
export default [
  {
    input: "src/index.d.ts",
  },
  {
    output: [
      { file: pkg.main, format: "cjs" },
      { file: pkg.module, format: "es" },
    ],
  },
  {
    input: "src/index.tsx",
    external: [
      ...Object.keys(pkg?.peerDependencies),
      ...Object.keys(pkg?.dependencies),
    ],
    plugins: [
      dts(),
      includePaths({
        paths: ["src"],
        extensions: [".js", ".ts", ".tsx", ".jsx"],
      }),
      babel({
        babelHelpers: "bundled",
      }),
      json({
        preferConst: true,
      }),
      image(),
      typescript({
        tsconfig: "./tsconfig.json",
      }),
    ],
    output: [
      { file: pkg.main, format: "cjs" },
      { file: pkg.module, format: "es" },
    ],
  },
];
