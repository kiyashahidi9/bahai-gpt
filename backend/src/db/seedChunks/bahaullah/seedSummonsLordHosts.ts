import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import writingsPool from "../../writingsPool.js"
import { generateEmbedding } from "../../../llm/helpers.js"
import { collectChunks, INSERT_CHUNK_QUERY } from "./seedUtils.js"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const CHUNKS_DIR = path.resolve(
    __dirname,
    "../../../../../data/processed/bahaullah/summons-lord-hosts"
)

const AUTHOR = "bahaullah"
const BOOK_TITLE = "summons of the lord of hosts"
const SOURCE_URL = "https://www.bahai.org/library/authoritative-texts/bahaullah/summons-lord-hosts/1#264287944"

async function seed() {
    const chunks = collectChunks(CHUNKS_DIR)
    let inserted = 0

    for (const chunk of chunks) {
        const content = fs.readFileSync(chunk.filePath, "utf-8").trim()
        if (!content) continue

        const embeddingInput = `${BOOK_TITLE} — ${chunk.section}: ${content}`
        const embedding = await generateEmbedding(embeddingInput)

        await writingsPool.query(INSERT_CHUNK_QUERY, [
            AUTHOR,
            BOOK_TITLE,
            chunk.section,
            content,
            SOURCE_URL,
            JSON.stringify(embedding),
        ])

        inserted++
        console.log(`Inserted ${path.relative(CHUNKS_DIR, chunk.filePath)}`)
    }

    console.log(`Done. Inserted ${inserted} chunks.`)
    process.exit(0)
}

seed().catch((error) => {
    console.error(error)
    process.exit(1)
})
