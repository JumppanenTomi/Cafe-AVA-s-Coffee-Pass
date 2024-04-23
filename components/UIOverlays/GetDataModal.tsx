import { PDFDownloadLink } from '@react-pdf/renderer';
import { useEffect, useState } from 'react';
import MyDoc from "@/components/templates/CollectedDataDoc";
import { collectedData } from '@/utils/ServerActions/dataCollection';

interface GetDataModalProps {
  isVisible: boolean,
  onClose: () => void
}

/**
 * Confirmation modal after clicking Download collected user information
 * @param isVisible - Boolean value that controls if the modal is shown or not
 * @param onClose - Function that changes the value of the isVisible variable
 * @returns The modal or nothing if the modal has been closed
 */
export default function GetDataModal({ isVisible, onClose }: GetDataModalProps) {
  const [data, setData] = useState({ email: "", userId: "", stampLogs: [{ timestamp: "", stamp_log_id: 0 }], voucherLogs: [{ timestamp: "", voucher_log_id: 0 }], fullName: "" });

  useEffect(() => {
    const fetchData = async () => {
      const response = await collectedData();
      if (!response) {
        onClose();
        return;
      }
      setData({
        email: response.email ?? "",
        userId: response.userId,
        stampLogs: response.stampLogs,
        voucherLogs: response.voucherLogs.map(log => ({
          timestamp: log.timestamp ?? "",
          voucher_log_id: log.voucher_log_id
        })),
        fullName: response.fullName,
      });
    };

    fetchData();
  }, [])

  if (!isVisible) return null;
  return (
    <div>
      <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"></div>

      <div className="flex items-center justify-center h-full">
        <div className="flex items-center justify-center min-h-full p-4 text-center sm:p-0">
          <div className="relative overflow-hidden text-left transition-all transform rounded-lg shadow-xl bg-orange sm:my-8 sm:w-full sm:max-w-lg">
            <div className="px-4 pt-5 pb-4 bg-orange sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 sm:text-center md:text-start sm:mt-0">
                  <h2 className="font-semibold leading-6 text-gray-900" id="modal-title">Download all collected user information</h2>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">Press the Download button to donwload a document with all your user information that we've collected.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-4 py-3 bg-orange sm:flex sm:flex-col md:flex-row-reverse sm:px-6">
              <div className="inline-flex justify-center w-full px-3 py-2 btn-secondary hover:bg-gray-50 sm:mt-0 sm:w-auto">
                {/* onClose function cannot be added to PDFDownloadLink components onClick, because if it is there the modal will close but the download will get cancelled */}
                <PDFDownloadLink document={<MyDoc email={data.email} userId={data.userId} stampLogs={data.stampLogs} voucherLogs={data.voucherLogs} fullName={data.fullName} />} fileName="Cafe AVA Coffee Pass collected user information.pdf">
                  {({ blob, url, loading, error }) =>
                    loading ? 'Loading document' : 'Download'
                  }
                </PDFDownloadLink>
              </div>
              <button type="button" className="inline-flex justify-center w-full px-3 py-2 btn-secondary md:mr-2 hover:bg-gray-50 sm:mt-0 sm:w-auto" onClick={() => onClose()}>Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}