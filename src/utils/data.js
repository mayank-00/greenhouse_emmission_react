import data from "../data.json"

import { longCategoryNameMapping, shortCategoryNameMapping } from "constants/index"

let indexing = {}

function isIndexCreationCompleted() {
    let interval = setInterval(() => {
        if (Object.keys(indexing).length) {
            clearInterval(interval)
            return Promise.resolve()
        }
    }, 200);
}

export function createIndexing() {
    for (let i = 0, len = data.length; i < len; i++) {

        const { country, category } = data[i]

        if (indexing.hasOwnProperty(country)) {

            if (indexing[country].hasOwnProperty(category)) {
                indexing[country][category].push(i)
            } else {
                indexing[country][category] = [i]
            }
            continue
        }

        indexing[country] = {
            [category]: [i]
        }

    }
}

export async function getFilteredData({ countries = [], categories = [] }) {

    if (!Object.keys(indexing).length) {
        await isIndexCreationCompleted()
    }

    if (!countries.length) {
        countries = Object.keys(indexing)
    }

    if (!categories.length) {
        categories = Object.keys(longCategoryNameMapping)
    } else {
        categories.forEach((category, index) => {
            categories[index] = shortCategoryNameMapping[category]
        })
    }

    let retObj = []

    countries.forEach(country => {

        categories.forEach(category => {

            if (!indexing[country].hasOwnProperty(category)) {
                return
            }

            let arr = [], indexArr = indexing[country][category]

            for (let i = indexArr.length - 1; i >= 0; i--) {
                arr.push(data[indexArr[i]])
            }

            retObj.push({ [`${country}-${longCategoryNameMapping[category]}`]: arr })
        })
    })

    return Promise.resolve(retObj)
}

export async function getAllCountries() {

    if (!Object.keys(indexing).length) {
        await isIndexCreationCompleted()
    }

    return Promise.resolve(Object.keys(indexing))
}

// export function getAllCountries() {

//     const cachedCountries = []

//     return function (formatter) {

//         if (cachedCountries.length) {
//             console.log("returning cached countries");
//             return cachedCountries
//         }

//         if (typeof formatter === "function") {

//             const checker = new Set()

//             for (let i = 0, len = data.length; i < len; i++) {

//                 let country = data[i].country

//                 if (checker.has(country)) {
//                     continue
//                 }

//                 checker.add(country)
//                 cachedCountries[i] = formatter(country)
//             }

//         } else {

//             const checker = new Set()

//             for (let i = 0, len = data.length; i < len; i++) {

//                 let country = data[i].country

//                 if (checker.has(country)) {
//                     continue
//                 }

//                 checker.add(country)
//                 cachedCountries[i] = country
//             }

//         }

//         return cachedCountries
//     }
// }