import { Spinner } from "@material-tailwind/react";
import { createPortal } from "react-dom";

type Props = {
  open: boolean;
};

const Loader = ({ open }: Props) => {
  if (!open) return <></>;

  return createPortal(
    <div className="jusitfy-center fixed left-0 top-0 z-50 flex h-screen w-screen items-center">
      <Spinner className="h-16 w-16 text-white" />
    </div>,
    document.body,
  );
};

export default Loader;
