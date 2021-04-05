import React, { useEffect, useState } from 'react'

import Select from "react-select";

import { useQueryState } from "utils/hooks";

import { getAllCountries } from "utils/data"

export default function CountrySelect() {

    const [options, setOptions] = useState(null)

    useEffect(() => {
        getAllCountries()
            .then(countries => {
                let countryOptions = Array.from(countries, country => ({ value: country, label: country }))
                setOptions(countryOptions)
            })
    }, [])

    const [selectedOption, setSelectedOption] = useQueryState({ queryName: "countries" })

    return (
        <div className="country-select">
            <Select
                value={selectedOption}
                onChange={setSelectedOption}
                options={options}
                isMulti
            />
        </div>
    )
}