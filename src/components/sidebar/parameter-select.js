import React, { useMemo } from 'react'

import Select from "react-select";

import { categoryLabelMapping } from "constants/index"
import { useQueryState } from "utils/hooks";

export default function ParameterSelect() {

    const options = useMemo(
        () => [
            { value: "carbon_dioxide_without_land_use", label: "Carbon-dioxide without land use" },
            { value: "greenhouse_gas_including_indirect_co2", label: "Greenhouse gas including indirect CO2" },
            { value: "greenhouse_gas_without_land_use", label: "Greenhouse gas without land use" },
            { value: "hydrofluorocarbons", label: "Hydro-fluoro-carbons" },
            { value: "methane_without_land_use", label: "Methane without land use" },
            { value: "nitrogen_trifluoride", label: "Nitrogen-trifluoride" },
            { value: "nitrous_oxide_without_land_use", label: "Nitrous Oxide without land use" },
            { value: "perfluorocarbons", label: "Per-Fluoro-Carbons" },
            { value: "sulphur_hexafluoride", label: "Sulphur Hexafluoride" },
            { value: "unspecified_mix_of_hydrofluorocarbons_and_perfluorocarbons", label: "Unspecified mix of hydro-fluoro-carbons & per-fluoro-carbons" },
        ],
        []
    )

    const [selectedOption, setSelectedOption] = useQueryState({ queryName: "categories", labelMapper: categoryLabelMapping })

    return (
        <div className="parameter-select">
            <Select
                value={selectedOption}
                onChange={setSelectedOption}
                options={options}
                isMulti
            />
        </div>
    )
}