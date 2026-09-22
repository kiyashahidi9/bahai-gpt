import fs from "fs"
import path from "path"

export const INSERT_CHUNK_QUERY = `INSERT INTO bahai_writings (author, book_title, section, content, source_url, embedding)
             VALUES ($1, $2, $3, $4, $5, $6)`

export function collectChunks(
    dir: string,
    relParts: string[] = []
): { section: string; filePath: string }[] {
    const entries = fs
        .readdirSync(dir, { withFileTypes: true })
        .sort((a, b) => a.name.localeCompare(b.name))
    const chunks: { section: string; filePath: string }[] = []

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name)
        if (entry.isDirectory()) {
            chunks.push(...collectChunks(fullPath, [...relParts, entry.name]))
        } else if (entry.isFile()) {
            chunks.push({
                section: relParts.length > 0 ? relParts.join(" / ") : "untitled",
                filePath: fullPath,
            })
        }
    }

    return chunks
}
