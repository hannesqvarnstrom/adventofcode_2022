import path from "path"
import { AdventFunction } from ".."
import { fileURLToPath } from "url"
import fs from 'fs/promises'
const run: AdventFunction = async () => { //431
    return run2()
    const inputPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), './input.txt')

    const pairs = (await fs.readFile(inputPath)).toString().split('\n')
        .filter((str) => {
            const [sectionA, sectionB] = str.split(',')
            const [ALow, AHigh] = sectionA.split('-').map(x => Number(x))
            const [BLow, BHigh] = sectionB.split('-').map(x => Number(x))
            const AContainsB = (ALow <= BLow && AHigh >= BHigh)
            const BContainsA = (BLow <= ALow && BHigh >= AHigh)

            return AContainsB || BContainsA
        })

    return pairs.length
}

const run2: AdventFunction = async () => { //823
    const inputPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), './input.txt')

    const pairs = (await fs.readFile(inputPath)).toString().split('\n')
        .filter((str) => {
            const [sectionA, sectionB] = str.split(',')
            const [ALow, AHigh] = sectionA.split('-').map(x => Number(x))
            const [BLow, BHigh] = sectionB.split('-').map(x => Number(x))

            if (BLow < ALow) {
                return BHigh >= ALow
            } else if (ALow < BLow) {
                return AHigh >= BLow
            } else {
                return true
            }
        })

    return pairs.length
}
export default run