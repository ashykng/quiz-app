export const Tools = {

    decodeHtmlEntities: (html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        return doc.documentElement.textContent || doc.body.textContent;
    }
}