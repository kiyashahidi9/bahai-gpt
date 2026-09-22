`
go through each folder in data/proccessed/bahaullah
AUTHOR is bahaullah
BOOK_TITLE is whatever the folder name is like "additional-tablets" or "bahai-sacrad-writings"
URL you can leave blank, i will fill that in later
Modify CHUNKS_DIR to fill that in
Create a file similar to seedPrayers.ts
  - name will be "seed<Book_title>"
  - you will create a script to add the chunks to the vectorDB through writingsPool
    - the schema will be (author, book_title, section, content, source_url, embedding)
        - the author, book_title, url will be the constants
        - content will be the chunk itself
        - embedding will be an embedding of the content via 'generateEmbedding'
    - the section will be the subdirectory name like "verses" or "paragraph"
        - if there is no subdirectory, make the "section" as "untitled"
- make a script file for each folder in data/proccessed/bahaullah
- make it in this same directory
`

import path from "path"
import { fileURLToPath } from "url"
import writingsPool from "../../writingsPool.js"
import { generateEmbedding } from "../../../utils/llmHelpers.js"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const CHUNKS_DIR = path.resolve(
    __dirname,
    "../../../../../data/processed/bahaullah/additional-prayers"
)

const AUTHOR = "bahaullah"
const BOOK_TITLE = "additional prayers and meditations"
const SOURCE_URL = "https://www.bahai.org/library/authoritative-texts/bahaullah/prayers-meditations/1#187607508"