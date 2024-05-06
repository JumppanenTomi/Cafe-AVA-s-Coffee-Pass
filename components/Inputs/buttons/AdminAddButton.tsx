interface AdminAddButtonProps {
  handleChange: () => void,
  modal: boolean,
  title: string
}

/**
 * Renders an admin add button component.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.handleChange - The function to handle the change event.
 * @param {boolean} props.modal - A boolean indicating whether the modal is visible or not.
 * @param {string} props.title - The title of the button.
 * @returns {JSX.Element} The rendered admin add button component.
 */
export default function AdminAddButton({ handleChange, modal, title }: AdminAddButtonProps) {
  return (
    <div>
      <button className="btn-primary" onClick={handleChange}>
        {title}
      </button>

      <div
        className={`fixed inset-0 z-10 ${modal ? "" : "hidden"
          } bg-gray-900/50 dark:bg-gray-900/60`}
        id="sidebarBackdrop"
        onClick={handleChange}
      ></div>
    </div>
  );
}