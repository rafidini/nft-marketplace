/** Takes a request and response, and gives renderable pages */
export default function renderPage(req: any, res: any): {
    signin(props?: any): void;
    signout(props?: any): void;
    verifyRequest(props?: any): void;
    error(props: any): void;
};
