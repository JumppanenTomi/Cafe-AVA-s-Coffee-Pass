import { PDFDownloadLink, Document, Page, View, Text } from '@react-pdf/renderer';
import { createTw } from "react-pdf-tailwind";
import tailwindConfig from "../tailwind.config"

const tw = createTw({
  theme: tailwindConfig.theme
});

interface MyDocProps {
  email: string,
  userId: string,
  stampLogs: { timestamp: string }[],
  voucherLogs: { timestamp: string }[]
}

// Work in progress. Still need to loop through all the timestamps and add them to the document.
const MyDoc = ({ email, userId, stampLogs, voucherLogs }: MyDocProps) => (
  <Document>
    <Page>
      <Text style={tw("text-2xl text-center my-5")}>Collected data</Text>
      <View style={tw("flex flex-col justify-between m-5 border-2 border-black items-center")}>
        <View style={tw("h-full w-full flex flex-col border-b-2 p-4 flex-wrap")}>
          <Text>Email</Text>
          <Text>{email}</Text>
        </View>
        <View style={tw("h-full w-full flex flex-col border-b-2 p-4 flex-wrap")}>
          <Text>User ID</Text>
          <Text>{userId}</Text>
        </View>
        <View style={tw("h-full w-full flex flex-col border-b-2 p-4 flex-wrap")}>
          <Text>Stamp timestamps</Text>
          <Text>{stampLogs[0].timestamp}</Text>
        </View>
        <View style={tw("h-full w-full flex flex-col p-4 flex-wrap")}>
          <Text>Voucher timestamps</Text>
          <Text>{voucherLogs[0].timestamp}</Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default MyDoc;