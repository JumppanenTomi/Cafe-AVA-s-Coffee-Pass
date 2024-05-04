import { Document, Page, View, Text } from '@react-pdf/renderer';
import { createTw } from "react-pdf-tailwind";
import tailwindConfig from "@/tailwind.config"

// Create tailwind using the app's tailwind config. 
// This is required so that tailwind can be added to the document's components
const tw = createTw({
  theme: tailwindConfig.theme
});

interface MyDocProps {
  email: string,
  userId: string,
  stampLogs: { timestamp: string, stamp_log_id: number }[],
  privateVoucherLogs: { created_at: string, id: string }[],
  publicVoucherLogs: { created_at: string, id: number }[],
  fullName: string,
}

/**
 * PDF template for Users' collected data
 * @param email - User's email
 * @param userId - User's ID
 * @param stampLogs - Array of stampLogs objects that include timestamp: string and stamp_log_id: number
 * @param privateVoucherLogs - Array of privateVoucherLogs objects that include created_at: string and id: string
 * @param publicVoucherLogs - Array of publicVoucherLogs objects that include created_at: string and id: number
 * @param fullName - User's full name provided by social login, if social login wasn't used, fullName is an empty string instead 
 * @returns PDF document including all data that has been collected about the user
 */
const MyDoc = ({ email, userId, stampLogs, privateVoucherLogs, publicVoucherLogs, fullName }: MyDocProps) => (
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
          <Text>Stamp creation timestamps:</Text>
          {stampLogs.map((stampLog) => (
            <Text style={tw("py-2")} key={stampLog.stamp_log_id} widows={4}>{stampLog.timestamp}</Text>
          ))}
        </View>
        <View style={tw("w-full flex flex-col border-b-2 p-2")}>
          <Text>Voucher creation timestamps that are linked to this account:</Text>
          {privateVoucherLogs.map((privateVoucherLogs) => (
            <Text style={tw("py-2")} key={privateVoucherLogs.id} widows={4}>{privateVoucherLogs.created_at}</Text>
          ))}
        </View>
        <View style={tw("w-full flex flex-col p-2")}>
          <Text>Public Voucher usage timestamps:</Text>
          {publicVoucherLogs.map((publicVoucherLogs) => (
            <Text style={tw("py-2")} key={publicVoucherLogs.id} widows={4}>{publicVoucherLogs.created_at}</Text>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);

export default MyDoc;