import {collectedData} from "@/app/actions"

interface GetDataModalProps {
  isVisible: boolean,
  onClose: () => void
}

export default function GetDataModal({isVisible, onClose}: GetDataModalProps) {
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
                  <h2 className="font-semibold leading-6 text-gray-900" id="modal-title">Request all data</h2>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">The data will be sent to your registered email address.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-orange px-4 py-3 sm:flex sm:flex-col md:flex-row-reverse sm:px-6">
              <button type="button" className="inline-flex w-full justify-center btn-secondary hover:bg-gray-50 md:ml-3 sm:w-auto" onClick={() => collectedData()}>Request data</button>
              <button type="button" className="inline-flex w-full justify-center btn-secondary px-3 py-2 hover:bg-gray-50 sm:mt-0 sm:w-auto" onClick={() => onClose()}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}