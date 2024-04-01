import { PDFDownloadLink } from '@react-pdf/renderer';
import { collectedData } from '@/app/actions';
import { useEffect, useState } from 'react'
import MyDoc from "@/components/CollectedDataDoc"

interface GetDataModalProps {
  isVisible: boolean,
  onClose: () => void
}

export default function GetDataModal({ isVisible, onClose }: GetDataModalProps) {
  const [data, setData] = useState({ email: "", userId: "", stampLogs: [{ timestamp: "" }], voucherLogs: [{ timestamp: "" }] });

  useEffect(() => {
    const fetchData = async () => {
      const response = await collectedData();
      setData(response);
    };

    fetchData();
  }, [])

  if (!isVisible) return null;
  return (
    <div>
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="h-full flex items-center justify-center">
        <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-orange text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-orange px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 sm:text-center md:text-start sm:mt-0">
                  <h2 className="font-semibold leading-6 text-gray-900" id="modal-title">Download all data</h2>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">Press the Download button to donwload a document with all your data.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-orange px-4 py-3 sm:flex sm:flex-col md:flex-row-reverse sm:px-6">
              <div className="inline-flex w-full justify-center btn-secondary px-3 py-2 hover:bg-gray-50 sm:mt-0 sm:w-auto">
                {/* onClose function cannot be added to PDFDownloadLink components onClick, because if it is there the modal will close but the download will get cancelled */}
                <PDFDownloadLink document={<MyDoc email={data.email} userId={data.userId} stampLogs={data.stampLogs} voucherLogs={data.voucherLogs} />} fileName="somename.pdf">
                  {({ blob, url, loading, error }) =>
                    loading ? 'Loading document' : 'Download'
                  }
                </PDFDownloadLink>
              </div>
              <button type="button" className="inline-flex w-full justify-center btn-secondary px-3 py-2 md:mr-2 hover:bg-gray-50 sm:mt-0 sm:w-auto" onClick={() => onClose()}>Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}