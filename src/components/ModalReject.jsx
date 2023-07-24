import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import Swal from "sweetalert2";

const baseUrl = "http://localhost:3000";

export default function ModalReject({ id, close }) {
  const [open, setOpen] = useState(true);
  //   const [selectedBook, setSelectedBook] = useState(null);
  const cancelButtonRef = useRef(null);
  const alasan = useRef(null);

  //   useEffect(() => {
  //     const getBook = async () => {
  //       try {
  //         const { data } = await axios.get(`${baseUrl}/book/${id}`, {
  //           headers: { access_token: localStorage.getItem("access_token") },
  //         });
  //         setSelectedBook(data.booking);
  //       } catch (err) {
  //         console.log(err);
  //         const error = err.response.data.message;

  //         Swal.fire({
  //           icon: "error",
  //           title: "Oops...",
  //           text: `${error}`,
  //         });
  //       }
  //     };
  //     getBook();
  //   }, []);

  const closeModal = () => {
    setOpen(false);
    close();
  };

  const clickReject = async () => {
    try {
      const { data } = await axios.patch(
        `${baseUrl}/update-book`,
        {
          id: id,
          status: "rejected",
          alasan: alasan.current.value,
        },
        {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        }
      );
    } catch (err) {
      console.log(err);
      const error = err.response.data.message;

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error}`,
      });
    } finally {
      setOpen(false);
      close();
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <ExclamationTriangleIcon
                      className="h-6 w-6 text-red-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      Reject Booking
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to reject Booking id : {id}?
                      </p>
                      <div className="relative mt-5">
                        <label
                          htmlFor="name"
                          className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
                        >
                          Alasan Penolakan
                        </label>
                        <input
                          type="text"
                          className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          id="alasan"
                          placeholder="Alasan Penolakan Booking"
                          ref={alasan}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    onClick={() => clickReject()}
                  >
                    Reject
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => closeModal()}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
