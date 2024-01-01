
// CAN ONLY BE RUN WITH THE LATEST BUILD AVAILABLE
import {flushFixtures} from "../build/test/fixtures/index.js"

flushFixtures().then(() => {
  console.log('fixtures flushed')
  // eslint-disable-next-line unicorn/no-process-exit
  process.exit()
})
