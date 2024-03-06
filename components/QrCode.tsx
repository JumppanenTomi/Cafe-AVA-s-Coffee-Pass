'use client'
import QrCodeGen from "./QrCodeGen"
import { useState, useEffect } from "react"
import short from "short-uuid" // npm package to generate uuid

const QrCode = () => {
    const [uId, setUId] = useState('')
    const translator = short() // uuid generator

    useEffect(() => {
        setUId(translator.new())
    }, [])

    return (
        <div>
            {uId && <QrCodeGen text={uId}></QrCodeGen>}
        </div>
    )
}

export default QrCode