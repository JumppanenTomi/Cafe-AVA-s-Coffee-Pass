import QrCodeGen from "./QrCodeGen"
import short from "short-uuid" // npm package to generate uuid
import {addNewTempCode} from "@/app/client/server"
import {createClient} from "@/utils/supabase/server";

const checkCodes = async (userId: string) => {
    const supabase = createClient()
    let {data: temp_codes, error} = await supabase
        .from('temp_codes')
        .select('*')
        .eq('used', false)
        .eq('user_id', userId)
        .gte('created_at', new Date(new Date().getTime() - 15 * 60 * 1000).toISOString())
    if (error) console.log(error)
    return temp_codes ? temp_codes[0] : null
}

async function setOldRowsToUsed() {
    const supabase = createClient()
    const fifteenMinutesAgo = new Date(new Date().getTime() - 15 * 60 * 1000).toISOString();
    try {
        let {data, error} = await supabase
            .from('temp_codes')
            .update({used: true})
            .lte('created_at', fifteenMinutesAgo);

        if (error) {
            console.log('Error updating', error);
        } else {
            console.log('Updated ', data.length, ' rows');
        }
    } catch (error) {
        console.log('Exception thrown: ', error);
    }
}

//setOldRowsToUsed();

const StampCode = () => {
    const translator = short() // uuid generator
    const code = translator.generate()
    addNewTempCode(code)

    return (
        <QrCodeGen text={process.env.NEXT_PUBLIC_VERCEL_URL + '/admin/addStamp/' + code} width={300}></QrCodeGen>
    )
}

export default StampCode