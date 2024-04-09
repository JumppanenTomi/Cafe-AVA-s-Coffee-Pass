import { addNewTempCode } from "@/utils/ServerActions/tempCode"
import QrCodeGen from "./QrCodeGen"
import short from "short-uuid"

const StampCode = () => {
    const translator = short() // uuid generator
    const code = translator.generate()
    addNewTempCode(code)

    return (
        <QrCodeGen text={process.env.NEXT_PUBLIC_VERCEL_URL + '/admin/addStamp/' + code} width={300}></QrCodeGen>
    )
}

export default StampCode