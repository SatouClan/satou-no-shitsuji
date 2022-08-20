import type { NextPage } from 'next'
import { useState, useEffect } from 'react'

import type { Data } from './api'


const Home: NextPage = () => {
    const [nowDoing, setNowDoing] = useState('')


    useEffect(() => {
        fetch('api')
            .then((res) => res.json())
            .then((data: Data) => {
                setNowDoing(data.doing)
            })
    })


    return (
        <>
            Coming soon...
            Now: {nowDoing}
        </>
    )
}

export default Home
