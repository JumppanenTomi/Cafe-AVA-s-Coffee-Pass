interface AdminAddButtonProps {
  handleChange: () => void,
  modal: boolean,
  title: string
}

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