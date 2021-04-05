import React, { useCallback } from 'react'

import { Chart } from 'react-charts'
import { alignAuto, anchorPointer } from 'react-charts/dist/react-charts.development'

import { useGetDataFromQueryParameters } from "utils/hooks"

export default function Graph() {


    const { filteredData } = useGetDataFromQueryParameters()

    const axes = React.useMemo(
        () => [
            { primary: true, type: 'linear', position: 'bottom' },
            { type: 'linear', position: 'left' }
        ],
        []
    )

    const tooltip = React.useMemo(
        () => ({
            align: alignAuto,
            anchor: anchorPointer
        }),
        []
    );

    const getDatums = useCallback((series) => Object.values(series)[0], [])

    const getPrimary = useCallback((datum) => datum.year, [])

    const getSecondary = useCallback((datum) => datum.value, [])

    const getLabel = useCallback(series => Object.keys(series)[0], [])

    return (
        <div
            style={{
                width: '400px',
                height: '300px'
            }}
            className="chart"
        >
            <p>Graph will show below</p>
            {
                filteredData.length
                    ?
                    <Chart
                        data={filteredData}
                        axes={axes}
                        tooltip={tooltip}
                        getDatums={getDatums}
                        getPrimary={getPrimary}
                        getSecondary={getSecondary}
                        getLabel={getLabel}
                    />
                    :
                    null
            }
        </div>
    )
}