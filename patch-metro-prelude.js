#!/usr/bin/env node
/*
 * Chakra (System Chakra in UWP) does not define globalThis (ES2020), but Metro's
 * bundle prelude (getPreludeCode.js) references it before any app code runs, so a
 * Chakra bundle throws "'globalThis' is not defined" at global scope. This patch
 * prepends a shim to the prelude that defines globalThis once, before it is used.
 * Hermes is unaffected (the shim no-ops when globalThis already exists).
 *
 * Runs from the postinstall hook because it edits a file under node_modules, which
 * every install overwrites. Idempotent: re-running is a no-op once patched.
 */
const fs = require('node:fs');
const path = require('node:path');

const target = path.resolve(__dirname, 'node_modules', 'metro', 'src', 'lib', 'getPreludeCode.js');

if (!fs.existsSync(target)) {
	console.error(`patch-metro-prelude: ${target} not found. Run yarn install first.`);
	process.exit(1);
}

const marker = '__g.globalThis=__g';
const original = fs.readFileSync(target, 'utf8');

if (original.includes(marker)) {
	console.log('patch-metro-prelude: already patched, skipping.');
	process.exit(0);
}

const shim =
	"if(typeof globalThis==='undefined'){var __g=typeof self!=='undefined'?self:typeof window!=='undefined'?window:typeof global!=='undefined'?global:this;__g.globalThis=__g;}";

const search = 'return `var ${vars.join(",")};';
const replacement = 'return `' + shim + 'var ${vars.join(",")};';

if (!original.includes(search)) {
	console.error(
		'patch-metro-prelude: expected prelude template not found in getPreludeCode.js. Metro format may have changed; update this script.'
	);
	process.exit(1);
}

fs.writeFileSync(target, original.replace(search, replacement), 'utf8');
console.log('patch-metro-prelude: injected globalThis shim into Metro prelude.');
