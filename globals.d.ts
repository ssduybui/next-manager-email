interface Window {
    grecaptcha: ReCaptchaInstance;
}

interface ReCaptchaInstance {
    ready: (callback: () => void) => void;
    execute: (siteKey: string, options: { action: string }) => Promise<string>;
}