import { addNewTempCode } from "@/utils/ServerActions/tempCode"
import QrCodeGen from "./QrCodeGen"
import short from "short-uuid"

/**
 * Renders a QR code for stamp code generation.
 * Generates a unique stamp code using a UUID generator and adds it to the temporary codes list.
 * The QR code contains a URL that includes the stamp code.
 */
const StampCode = () => {
    const translator = short() // uuid generator
    const code = translator.generate()
    addNewTempCode(code)

    return (
      <QrCodeGen
        text={process.env.NEXT_PUBLIC_VERCEL_URL + "/admin/addStamp/" + code}
        width={400}
      ></QrCodeGen>
    );
}

export default StampCode