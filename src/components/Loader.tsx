import { Spinner } from "@material-tailwind/react";
import { createPortal } from "react-dom";

type Props = {
  open: boolean;
};

const Loader = ({ open }: Props) => {
  if (!open) return <></>;

  return createPortal(
    <div className="justify-center fixed left-0 top-0 z-[10000] flex h-screen w-screen items-center bg-black opacity-25">
      <Spinner className="w-16 h-16 text-white" />
    </div>,
    document.body,
  );
};

export default Loader;
