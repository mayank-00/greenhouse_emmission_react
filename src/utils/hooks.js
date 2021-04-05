import { useEffect, useState } from "react";

import { useHistory, useLocation } from "react-router-dom";

import { getFilteredData } from "./data";
import { createQueryFromOptions } from "./index"

export function useQueryState({ queryName, labelMapper }) {

    const [selectedOption, setSelectedOption] = useState(null)

    const location = useLocation()
    const history = useHistory()

    useEffect(() => {

        if (location.search !== "" && selectedOption == null) {
            const params = new URLSearchParams(location.search)

            if (params.has(queryName)) {
                let queries = params.get(queryName).split(","), options = []

                if (typeof labelMapper === "object") {
                    queries.forEach(query => {
                        options.push({ value: query, label: labelMapper[query] })
                    })
                } else {
                    queries.forEach(query => {
                        options.push({ value: query, label: query })
                    })
                }
                setSelectedOption(options)
            }
        }
    }, [])

    useEffect(() => {

        const params = new URLSearchParams(location.search)

        if (Array.isArray(selectedOption) && selectedOption.length) {
            params.set(queryName, createQueryFromOptions(selectedOption))
        } else {
            params.delete(queryName)
        }

        history.push({ search: params.toString() })

    }, [selectedOption, history])

    return [selectedOption, setSelectedOption]
}

export function useGetDataFromQueryParameters() {

    const [filteredData, setFilteredData] = useState([])

    const location = useLocation()

    useEffect(() => {

        const params = new URLSearchParams(location.search)

        let paramObj = {}

        params.forEach((value, key) => {
            paramObj[key] = value.split(",")
        })

        if (Object.keys(paramObj).length) {
            getFilteredData(paramObj)
                .then(data => {
                    setFilteredData(data)
                })

        } else {
            setFilteredData([])
        }

    }, [location])

    return { filteredData, setFilteredData }
}