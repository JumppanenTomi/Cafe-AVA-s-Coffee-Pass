import { PDFDownloadLink, Document, Page } from '@react-pdf/renderer';
import { collectedData } from '@/app/actions';
import { useEffect, useState } from 'react';

const MyDoc = ({data}: {data: object}) => (
  <Document>
    <Page>
      // My document data
    </Page>
  </Document>
);

interface GetDataModalProps {
  isVisible: boolean,
  onClose: () => void
}

export default function GetDataModal({ isVisible, onClose }: GetDataModalProps) {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await collectedData();
      setData(response);
    };
    
    fetchData();
  }, [])
  console.log("testing :DD", data)
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
              <div className="inline-flex w-full justify-center btn-secondary px-3 py-2 hover:bg-gray-50 sm:mt-0 sm:w-auto" onClick={() => onClose()}>
                <PDFDownloadLink document={<MyDoc data={data} />} fileName="somename.pdf">
                  {({ blob, url, loading, error }) =>
                    loading ? 'Loading document...' : 'Download'
                  }
                </PDFDownloadLink>
              </div>
              <button type="button" className="inline-flex w-full justify-center btn-secondary px-3 py-2 hover:bg-gray-50 sm:mt-0 sm:w-auto" onClick={() => onClose()}>Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}