import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import writingsPool from "../../writingsPool.js"
import { generateEmbedding } from "../../../utils/llmHelpers.js"
import { collectChunks, INSERT_CHUNK_QUERY } from "./seedUtils.js"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const CHUNKS_DIR = path.resolve(
    __dirname,
    "../../../../../data/processed/abdulbaha/saq"
)

const AUTHOR = "abdulbaha"
const BOOK_TITLE = "some answered questions"
const SOURCE_URL: string | null = null

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
