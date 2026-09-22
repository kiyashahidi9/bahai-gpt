export declare const INSERT_CHUNK_QUERY = "INSERT INTO bahai_writings (author, book_title, section, content, source_url, embedding)\n             VALUES ($1, $2, $3, $4, $5, $6)";
export declare function collectChunks(dir: string, relParts?: string[]): {
    section: string;
    filePath: string;
}[];
//# sourceMappingURL=seedUtils.d.ts.map