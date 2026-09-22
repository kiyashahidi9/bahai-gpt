import { execFileSync } from "child_process"
import path from "path"
import { fileURLToPath } from "url"

// Each script below calls process.exit(0) when it finishes, so they can't
// be imported and run in-process one after another - the first one to finish
// would kill this script too. Running each as its own `tsx` process avoids that.
const __dirname = path.dirname(fileURLToPath(import.meta.url))

const SCRIPTS = ["seedSAQ.ts"]

for (const script of SCRIPTS) {
    const scriptPath = path.join(__dirname, script)
    console.log(`\n=== Running ${script} ===`)
    execFileSync("npx", ["tsx", scriptPath], { stdio: "inherit", shell: true })
}

console.log("\nAll seed scripts completed.")
