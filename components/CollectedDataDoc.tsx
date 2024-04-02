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
  voucherLogs: { timestamp: string, voucher_log_id: number }[]
}

// The PDF file for collected user information
// There is currently no separator between pages
const MyDoc = ({ email, userId, stampLogs, voucherLogs }: MyDocProps) => (
  <Document>
    <Page wrap>
      <Text style={tw("text-2xl text-center mt-5")}>Collected data</Text>
      <View style={tw("flex flex-col m-5 border-2 border-black")}>
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