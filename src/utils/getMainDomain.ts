import { parseDomain, ParseResultType } from "parse-domain";

export const getMainDomain = async (url: string) => {
    const domainA = new URL(url !== null && url !== undefined ? url : '').hostname;
    const parseResult = parseDomain(domainA);
    if (parseResult.type === ParseResultType.Listed) {
        const { domain } = parseResult;
        return domain;
    } else {
        return null;
    }
}