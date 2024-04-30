import { PDFDownloadLink } from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import MyDoc from "@/components/templates/CollectedDataDoc";
import { collectedData } from "@/utils/ServerActions/dataCollection";
import Popup from "./popup";

interface GetDataModalProps {
  isVisible: boolean;
  onClose: () => void;
}

/**
 * Confirmation modal after clicking Download collected user information
 * @param isVisible - Boolean value that controls if the modal is shown or not
 * @param onClose - Function that changes the value of the isVisible variable
 * @returns The modal or nothing if the modal has been closed
 */
export default function GetDataModal({
  isVisible,
  onClose,
}: GetDataModalProps) {
  const [data, setData] = useState({
    email: "",
    userId: "",
    stampLogs: [{ timestamp: "", stamp_log_id: 0 }],
    privateVoucherLogs: [{ created_at: "", id: "" }],
    publicVoucherLogs: [{ created_at: "", id: 0 }],
    fullName: "",
  });

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
        privateVoucherLogs: response.privateVoucherLogs.map((log) => ({
          created_at: log.created_at ?? "",
          id: log.id,
        })),
        publicVoucherLogs: response.publicVoucherLogs.map((log) => ({
          created_at: log.created_at ?? "",
          id: log.id,
        })),
        fullName: response.fullName,
      });
    };

    fetchData();
  }, []);

  if (!isVisible) return null;
  return (
    <Popup onClose={onClose} visible={isVisible}>
      <div className='flex flex-col gap-5'>
        <h2 className='font-semibold leading-6 text-gray-900' id='modal-title'>
          Download all collected user information
        </h2>
        <p>
          Press the Download button to download a document with all your user
          information that we've collected.
        </p>
        <div className='flex justify-end w-full gap-5'>
          <button className='btn-primary'>
            <PDFDownloadLink
              document={
                <MyDoc
                  email={data.email}
                  userId={data.userId}
                  stampLogs={data.stampLogs}
                  privateVoucherLogs={data.privateVoucherLogs}
                  publicVoucherLogs={data.publicVoucherLogs}
                  fullName={data.fullName}
                />
              }
              fileName='Cafe AVA Coffee Pass collected user information.pdf'
            >
              {({ blob, url, loading, error }) => {
                return loading ? "Loading document" : `Download`;
              }}
            </PDFDownloadLink>
          </button>
          <button
            type='button'
            className='btn-secondary'
            onClick={() => onClose()}
          >
            Close
          </button>
        </div>
      </div>
    </Popup>
  );
}
