declare module "recharts";

declare module "@tanstack/react-query" {
  export class QueryClient {
    constructor(config?: any);
  }
  export const QueryClientProvider: any;
}

declare module "@tanstack/react-router" {
  export function createRootRouteWithContext<T>(): any;
  export function createFileRoute(path: string): any;
  export function createRouter(config: any): any;
  export const Link: any;
  export const useRouter: any;
  export const useNavigate: any;
  export const HeadContent: any;
  export const Scripts: any;
  export const Outlet: any;
}
