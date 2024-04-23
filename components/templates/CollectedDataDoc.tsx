import { Document, Page, View, Text } from '@react-pdf/renderer';
import { createTw } from "react-pdf-tailwind";
import tailwindConfig from "@/tailwind.config"

const tw = createTw({
  theme: tailwindConfig.theme
});

interface MyDocProps {
  email: string,
  userId: string,
  stampLogs: { timestamp: string, stamp_log_id: number }[],
  voucherLogs: { timestamp: string, voucher_log_id: number }[],
  fullName: string,
}

/**
 * PDF template for Users' collected data
 * @param email - User's email
 * @param userId - User's ID
 * @param stampLogs - Stamp logs based on user's ID
 * @param voucherLogs - Voucher logs based on user's ID
 * @param fullName - User's full name provided by social login, if social login wasn't used, fullName is an empty string instead 
 * @returns PDF document including all data that has been collected about the user
 */
const MyDoc = ({ email, userId, stampLogs, voucherLogs, fullName }: MyDocProps) => (
  <Document>
    <Page wrap>
      <Text style={tw("text-2xl text-center mt-5")}>Collected data</Text>
      <View style={tw("flex flex-col m-5 border-2 border-black")}>
        {fullName != "" &&
          <View style={tw("w-full flex flex-col border-b-2 p-2")}>
            <Text>Full Name (from Social Login):</Text>
            <Text style={tw("py-2")}>{fullName}</Text>
          </View>
        }
        <View style={tw("w-full flex flex-col border-b-2 p-2")}>
          <Text>Email:</Text>
          <Text style={tw("py-2")}>{email}</Text>
        </View>
        <View style={tw("w-full flex flex-col border-b-2 p-2")}>
          <Text>User ID:</Text>
          <Text style={tw("py-2")}>{userId}</Text>
        </View>
        <View style={tw("w-full flex flex-col border-b-2 p-2")}>
          <Text>Stamp timestamps:</Text>
          {stampLogs.map((stampLog) => (
            <Text style={tw("py-2")} key={stampLog.stamp_log_id} widows={4}>{stampLog.timestamp}</Text>
          ))}
        </View>
        <View style={tw("w-full flex flex-col p-2")}>
          <Text>Voucher timestamps:</Text>
          {voucherLogs.map((voucherLogs) => (
            <Text style={tw("py-2")} key={voucherLogs.voucher_log_id} widows={4}>{voucherLogs.timestamp}</Text>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);

export default MyDoc;