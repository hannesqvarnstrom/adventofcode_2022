
import path from 'path'
import { AdventFunction } from '../index'
import fs from 'fs/promises'
import { fileURLToPath } from 'url'
import lodash from 'lodash'



const run: AdventFunction = async () => {// 8233
    return run2()
    const inputPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'input.txt')
    const inputData = (await fs.readFile(inputPath)).toString().split('\n').map(rucksack => {
        const half = rucksack.length / 2
        const compartments = [rucksack.slice(0, half), rucksack.slice(half)]

        for (let i = 0; i < compartments[0].length; i++) {
            let characterForRun = compartments[0][i]

            for (let j = 0; j < compartments[1].length; j++) {
                if (compartments[1][j] === compartments[0][i]) {
                    return parseCharacter(characterForRun)
                }
            }
        }
        return 0
    }).reduce((prev, acc) => {
        return prev + acc
    }, 0)

    return inputData
}

const run2: AdventFunction = async () => {// 2821
    const inputPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'input.txt')
    const allRucksacks = (await fs.readFile(inputPath)).toString().split('\n')


    const groups = lodash.chunk(allRucksacks, 3)
    // const groups: string[][] = []
    // let j = 0
    // for (let i = 0; i < allRucksacks.length; i++) {
    //     if (groups[j]) {
    //         if (groups[j].length < 3) {
    //             groups[j].push(allRucksacks[i])
    //         }
    //     } else {
    //         groups.push([allRucksacks[j]])
    //     }

    //     if (groups[j].length === 3) {
    //         j++
    //     }
    // }


    let sum = 0

    for (let i = 0; i < groups.length; i++) {
        sum += getItemInAllThree(groups[i])
    }

    return sum
}

export default run

function getItemInAllThree(group: string[]): number {
    const [one, two, three] = group
    for (let j = 0; j < one.length; j++) {
        const character = one[j]
        const existsInTwo = two.indexOf(character) !== -1
        const existsInThree = three.indexOf(character) !== -1
        if (existsInTwo && existsInThree) {
            const val = parseCharacter(character)
            console.log(`val:`, { val, character })
            return val
        }
    }
    console.log('nothing found!!! ERROR!')
    console.log('THIS:', { group })
    return 0
}

function parseCharacter(s: string): number {
    if (s.toUpperCase() === s) {
        return s.charCodeAt(0) - 38
    } else {
        return s.charCodeAt(0) - 96

    }
}