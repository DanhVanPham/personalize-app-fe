import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from '@material-tailwind/react'

type Props = {
    open: boolean;
    title?: string;
    body?: string;
    type?: 'delete' | 'submit'
    onClose: () => void;
    onSubmit: () => void;
}

const ConfirmDialog = ({open, title, body, type = 'delete', onClose, onSubmit}: Props) => {
  return (
    <Dialog open={open} handler={onClose}>
        <DialogHeader className='pb-1.5 text-xl'>{title || 'Delete item'}</DialogHeader>
        <DialogBody className='py-1.5'>
          {body || 'Are you sure you want to delete this item?'}
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            
            onClick={onClose}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color={type === 'delete' ? "red" : 'green'} onClick={onSubmit}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
  )
}

export default ConfirmDialog