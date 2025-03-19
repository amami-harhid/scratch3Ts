# scratch3Ts
tscratch3likejsを使ったTypescriptのサンプルです。
webpackでbundleして利用します。

## install 
npm init
npm install --save-dev @eslint/js
npm install --save-dev @types/node
npm install --save-dev eslint
npm install --save-dev globals
npm install --save-dev ts-loader
npm install --save-dev typescript
npm install --save-dev typescript-eslint
npm install --save-dev webpack-cli
npm install --save-dev https://github.com/amami-harhid/tscratch3likejs.git

## src/index.html
```: src/index.html
<title>Sample01</title>
<meta charset="utf-8" />
<link rel="icon" href="data:,">
<script src="../dist/bundle.js" type="module"></script>
```
## src/index.ts
```
import type {S3PlayGround} from "@typeJS/s3PlayGround";
import type {S3Stage} from "@typeJS/s3Stage";
import type {S3Sprite} from "@typeJS/s3Sprite";
import {Pg, Lib} from "tscratch3likejs/s3lib-importer";
～
```
## build
npx webpack --mode development
--> dist/bundle.js, dist/budle.js.map が作成される

