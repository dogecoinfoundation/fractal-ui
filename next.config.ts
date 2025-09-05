import { access, symlink } from "node:fs/promises";
import { join } from "node:path";
import type { NextConfig } from "next";
const path = require("path");

type Compiler = {
  hooks: {
    afterEmit: {
      tapPromise: (
        key: string,
        callback: (compiler: {
          options: { output: { path: string } };
        }) => Promise<void>,
      ) => void;
    };
  };
};

// biome-ignore lint/suspicious/noExplicitAny: <Webpack classifies config as any>
const patchNextConfig = (config: any, isServer: boolean, dev: boolean) => {
  // https://github.com/vercel/next.js/issues/25852
  // Use the client static directory in the server bundle and prod mode
  // Fixes `Error occurred prerendering page "/"`
  config.experiments = {
    ...config.experiments,
    asyncWebAssembly: true,
    layers: true,
  };

  if (!dev) {
    config.plugins.push(
      new (class {
        apply(compiler: Compiler) {
          compiler.hooks.afterEmit.tapPromise(
            "SymlinkWebpackPlugin",
            async (compiler) => {
              if (isServer) {
                const from = join(compiler.options.output.path, "../static");
                const to = join(compiler.options.output.path, "static");

                try {
                  await access(from);
                  return;
                } catch (error) {
                  if (error instanceof Error && "code" in error) {
                    // No link exists
                  } else {
                    throw error;
                  }
                }

                await symlink(to, from, "junction");
              }
            },
          );
        }
      })(),
    );

    if (isServer) {
      config.output.webassemblyModuleFilename =
        "./../static/wasm/[modulehash].wasm";
    } else {
      config.output.webassemblyModuleFilename = "static/wasm/[modulehash].wasm";
    }
  }

  return config;
};

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.*"],
  turbopack: {
    resolveAlias: {
      "@houseofdoge/km2": "@houseofdoge/km2/bindings/wasm/package.json",
      "@/app/globals.css": "./app/globals.css",
    },
  },
  webpack: (config, { isServer, dev }) =>
    patchNextConfig(config, isServer, dev),
};

export default nextConfig;
