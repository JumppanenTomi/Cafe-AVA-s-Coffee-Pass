"use client"
import {Suspense, useEffect, useState} from "react";
import {fetchUserId, markTempCodeAsUsed, processUserStamp} from "@/app/admin/addStamp/[code]/server";

export default function Page({params: {code}}: { params: { code: string } }) {
	const [userId, setUserId] = useState<string>()

	const [number, setNumber] = useState<number>(1)

	const giveStamps = () => {
		processUserStamp(code, number)
	}

	useEffect(() => {
		fetchUserId(code).then((r) => {
			markTempCodeAsUsed(code)
			setUserId(r)
		})
	}, [])

	return (
		<Suspense>
			<h1>{userId}</h1>
			<input type={"number"} defaultValue={1} max={10} min={1}
				   onChange={(e) => setNumber(e.target.valueAsNumber)}/>
			<button onClick={giveStamps}>Give Stamps</button>
		</Suspense>
	)
}