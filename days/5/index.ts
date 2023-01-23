import path from "path"
import { AdventFunction } from ".."
import fs from 'fs/promises'
import { fileURLToPath } from "url"
import lodash from "lodash"

const run: AdventFunction = async () => {
    const inputPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), './input.txt')
    const [stackDetails, instructions] = (await fs.readFile(inputPath)).toString().split('\n\n')

    const rows = stackDetails.split('\n').map(getStartingValuesFromRow)
    rows.pop()

    const amountOfStacks = 9
    const stacks: Record<number, string[]> = {}
    for (let i = 1; i <= amountOfStacks; i++) {
        stacks[i] = rows.map(row => row[i - 1]).filter(x => x.trim() !== '')
    }


    for (const instruction of instructions.split('\n')) {
        const { amount, from, to } = parseInstruction(instruction)
        moveFromTo(stacks, amount, from, to)
    }

    let answer = ''
    for (const num in stacks) {
        answer += `${stacks[num][0]}`
    }

    return answer
}

function moveFromTo(stacks: Record<number, string[]>, amount: number, from: number, to: number) {
    const fromStack = stacks[from]
    if (!fromStack) throw new Error('no such stack: ' + from)

    const toStack = stacks[to]
    if (!toStack) throw new Error('no such stack: ' + to)

    for (let i = 0; i < amount; i++) {
        const movingItem = fromStack.shift()
        if (movingItem !== undefined)
            toStack.unshift(movingItem)
    }

    stacks[from] = fromStack
    stacks[to] = toStack
}

function parseInstruction(str: string): { amount: number, from: number, to: number } {
    const moveIndex = 4
    const fromIndex = str.indexOf('from', moveIndex)
    const toIndex = str.indexOf('to', fromIndex)
    const amount = str.substring(moveIndex, fromIndex).trim()
    const from = str.substring(fromIndex + 4, toIndex).trim()
    const to = str.substring(toIndex + 2).trim()

    return { amount: Number(amount), from: Number(from), to: Number(to) }
}

function getStartingValuesFromRow(row: string): string[] {
    const arr = lodash.chunk(row.split(''), 4).map(arr => arr[1])

    return arr
}


export default run