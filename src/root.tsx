// @refresh reload
import { Routes } from "@solidjs/router";
import { Suspense } from "solid-js";
import {
  Body,
  FileRoutes,
  Head,
  Html,
  Meta,
  Scripts,
  Title,
} from "solid-start";
import { ErrorBoundary } from "solid-start/error-boundary";

import "./root.css";
import { trpc, queryClient } from "~/features/trpc";
import { SideMenu } from "./features/side-menu";

export default function Root() {
  return (
    <Html lang="en">
      <Head>
        <Title>SolidSpace</Title>

        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Body>
        <Suspense>
          <trpc.Provider queryClient={queryClient}>
            <ErrorBoundary>
              <div class="flex flex-row">
                <div class="max-w-xs">
                  <SideMenu />
                </div>

                <div class="flex flex-grow">
                  <Routes>
                    <FileRoutes />
                  </Routes>
                </div>
              </div>
            </ErrorBoundary>
          </trpc.Provider>
        </Suspense>

        <Scripts />
      </Body>
    </Html>
  );
}
