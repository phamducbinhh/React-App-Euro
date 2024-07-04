/// <reference types="vite/client" />

declare const google: any;

declare const FB: any;

declare global {
    interface Window {
        fbAsyncInit: () => void;
    }
}