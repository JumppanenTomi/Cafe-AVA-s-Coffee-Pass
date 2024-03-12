import QrCodeGen from "./QrCodeGen"
import short from "short-uuid" // npm package to generate uuid
import {addNewTempCode} from "@/app/client/server"

const QrCode = () => {
    const translator = short() // uuid generator
    const code = translator.generate()
    addNewTempCode(code)

    return (
            <QrCodeGen text={process.env.SITE_URL + '/admin/addStamp/' + code} width={300}></QrCodeGen>
    )
}

export default QrCode