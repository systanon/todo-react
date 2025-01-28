import React, { useState, useRef, useImperativeHandle, forwardRef } from 'react';
import { Dialog, DialogPanel, DialogTitle, Description } from '@headlessui/react';

interface ModalWindowProps {
  title: string;
  description: string;
  actions?: boolean;
  children: (methods: { close: () => void; confirm: (data: any) => void }) => React.ReactNode;
}
const Modal = forwardRef(({ title, description, children, actions }: ModalWindowProps, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const modalResolver = useRef<(data: any) => void | null>(null);

  useImperativeHandle(ref, () => ({
    open: async () => {
      return new Promise((resolve) => {
        modalResolver.current = resolve;
        setIsOpen(true);
      });
    },
    close: () => closeModal(null),
  }));

  const openModal = (result: any) => {
    if (modalResolver.current) modalResolver.current(result);
    setIsOpen(true);
  };

  const closeModal = (result: boolean | null = null) => {
    if (modalResolver.current) modalResolver.current(result);
    setIsOpen(false);
  };

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'
      >
        <DialogPanel className='w-full max-w-md  rounded-lg shadow-lg p-6'>
          <DialogTitle className='text-xl font-semibold'>{title}</DialogTitle>
          <Description className='mt-2 text-gray-600'>{description}</Description>
          <div className='mt-4'>{children({ close: closeModal, confirm: openModal })}</div>
          <div className='mt-4 flex justify-end gap-2'>
            {actions && (
              <>
                <button
                  onClick={() => closeModal(null)}
                  className='px-4 py-2 bg-gray-300 rounded hover:bg-gray-400'
                >
                  Cancel
                </button>
                <button
                  onClick={() => openModal(true)}
                  className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
                >
                  Confirm
                </button>
              </>
            )}
          </div>
        </DialogPanel>
      </Dialog>
    </div>
  );
});

export default Modal;
