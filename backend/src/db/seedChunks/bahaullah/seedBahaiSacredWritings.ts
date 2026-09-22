import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import writingsPool from "../../writingsPool.js"
import { generateEmbedding } from "../../../llm/helpers.js"
import { INSERT_CHUNK_QUERY } from "./seedUtils.js"

// Unlike every other book under data/processed/bahaullah, this compilation
// draws from both Bahá'u'lláh and 'Abdu'l-Bahá, split into top-level
// "bahaullah" / "abdulbaha" folders. So author is NOT a constant here -
// it's read off that top-level folder name instead.
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const CHUNKS_DIR = path.resolve(
    __dirname,
    "../../../../../data/processed/bahaullah/bahai-sacred-writings"
)

const BOOK_TITLE = "bahai sacred writings"
const SOURCE_URL = "https://www.bahai.org/library/authoritative-texts/bahaullah/bahai-sacred-writings/1#647533678"
const DEFAULT_AUTHOR = "bahaullah"

function collectChunks(
    dir: string,
    relParts: string[] = [],
    author: string = DEFAULT_AUTHOR
): { author: string; section: string; filePath: string }[] {
    const entries = fs
        .readdirSync(dir, { withFileTypes: true })
        .sort((a, b) => a.name.localeCompare(b.name))
    const chunks: { author: string; section: string; filePath: string }[] = []

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name)
        if (entry.isDirectory()) {
            // At the book root, "bahaullah" / "abdulbaha" folders set the author
            // for everything beneath them rather than contributing to the section.
            const isAuthorFolder =
                relParts.length === 0 && (entry.name === "bahaullah" || entry.name === "abdulbaha")

            chunks.push(
                ...collectChunks(
                    fullPath,
                    isAuthorFolder ? relParts : [...relParts, entry.name],
                    isAuthorFolder ? entry.name : author
                )
            )
        } else if (entry.isFile()) {
            chunks.push({
                author,
                section: relParts.length > 0 ? relParts.join(" / ") : "untitled",
                filePath: fullPath,
            })
        }
    }

    return chunks
}

async function seed() {
    const chunks = collectChunks(CHUNKS_DIR)
    let inserted = 0

    for (const chunk of chunks) {
        const content = fs.readFileSync(chunk.filePath, "utf-8").trim()
        if (!content) continue

        const embeddingInput = `${chunk.author} — ${BOOK_TITLE} — ${chunk.section}: ${content}`
        const embedding = await generateEmbedding(embeddingInput)

        await writingsPool.query(INSERT_CHUNK_QUERY, [
            chunk.author,
            BOOK_TITLE,
            chunk.section,
            content,
            SOURCE_URL,
            JSON.stringify(embedding),
        ])

        inserted++
        console.log(`Inserted [${chunk.author}] ${path.relative(CHUNKS_DIR, chunk.filePath)}`)
    }

    console.log(`Done. Inserted ${inserted} chunks.`)
    process.exit(0)
}

seed().catch((error) => {
    console.error(error)
    process.exit(1)
})
