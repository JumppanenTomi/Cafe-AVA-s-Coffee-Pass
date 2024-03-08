import QrCodeGen from "./QrCodeGen"
import short from "short-uuid" // npm package to generate uuid
import { addNewTempCode } from "@/app/client/server"

const QrCode = () => {
    const translator = short() // uuid generator
    const code = translator.generate()
    addNewTempCode(code)

    return (
        <div>
            <QrCodeGen text={process.env.SITE_URL + '/admin/addStamp/' + code}></QrCodeGen>
        </div>
    )
}

export default QrCode