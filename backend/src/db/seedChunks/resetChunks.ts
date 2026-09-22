import writingsPool from "../writingsPool.js"

async function reset() {
    const { rowCount } = await writingsPool.query("DELETE FROM bahai_writings")

    console.log(`Cleared bahai_writings (${rowCount ?? 0} rows deleted).`)
    process.exit(0)
}

reset().catch((error) => {
    console.error(error)
    process.exit(1)
})
