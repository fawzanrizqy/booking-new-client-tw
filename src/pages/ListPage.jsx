import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import ModalReject from "../components/ModalReject";
const baseUrl = "http://localhost:3000";

export const ListPage = () => {
  const [listBook, setListBook] = useState([]);
  const [listBookAll, setListBookAll] = useState([]);
  const [role, setRole] = useState("");
  const [modalReject, setModalReject] = useState(false);
  const [selectedBook, setSelectedBook] = useState(0);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", options);
  };

  const fetchBookAll = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/get-list-processed`, {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      });
      setListBookAll(data.bookings);
    } catch (err) {
      console.log(err);
      const error = err.response.data.message;

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error}`,
      });
    }
  };

  const fetchBook = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/get-list`, {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      });
      setListBook(data.bookings);
    } catch (err) {
      console.log(err);
      const error = err.response.data.message;

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error}`,
      });
    }
  };

  const closeModal = () => {
    console.log("ini dijalankan");
    fetchBookAll();
    setModalReject(false);
  };

  const rejectBook = (id) => {
    console.log("MASUK SINI");
    setSelectedBook(id);
    setModalReject(true);
  };

  const approveBook = async (id) => {
    try {
      const { data } = await axios.patch(
        `${baseUrl}/update-book`,
        {
          id: id,
          status: "approved",
          alasan: "disetujui",
        },
        {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        }
      );

      Swal.fire({
        width: 200,
        icon: "success",
        text: `Book id: ${id} has been approved!`,
        showConfirmButton: false,
        timer: 1500,
      });

      fetchBookAll();
      fetchBook();
    } catch (err) {
      console.log(err);
      const error = err.response.data.message;

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error}`,
      });
    }
  };

  useEffect(() => {
    fetchBook();

    if (localStorage.getItem("role") === "admin") {
      setRole("admin");
      fetchBookAll();
    } else {
      setRole("user");
    }
  }, [modalReject]);

  return (
    <>
      {modalReject ? (
        <ModalReject id={selectedBook} close={closeModal} />
      ) : (
        <></>
      )}
      <div className="px-4 sm:px-6 lg:px-8 mt-3">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              List Pending Bookings
            </h1>
          </div>
        </div>
        {/* table */}
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        ID
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Keperluan
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Jam
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Ruang
                      </th>
                      {role === "admin" ? (
                        <>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Status
                          </th>
                        </>
                      ) : (
                        <></>
                      )}
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                      >
                        <span className="sr-only">Status</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {listBook?.map((person) => (
                      <tr key={person.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {person.User.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {person.User.id_kampus}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {person.keperluan}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {formatDate(person.tgl_booking)}, {person.shift_mulai}{" "}
                          - {person.shift_selesai}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {person.Ruang.nama_ruang}
                        </td>
                        {role === "admin" ? (
                          <>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              <p className="text-indigo-600 hover:text-indigo-900">
                                {person.status}
                              </p>
                            </td>
                          </>
                        ) : (
                          <></>
                        )}
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          {role === "user" ? (
                            <>
                              <p className="text-indigo-600 hover:text-indigo-900">
                                {person.status}
                              </p>
                            </>
                          ) : (
                            <>
                              <button
                                type="button"
                                className="rounded-full bg-indigo-600 px-2.5 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 me-2"
                                onClick={() => approveBook(person.id)}
                              >
                                Approve
                              </button>
                              <button
                                type="button"
                                className="rounded-full bg-red-600 px-2.5 py-1 text-xs font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                                onClick={() => rejectBook(person.id)}
                              >
                                Reject
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {/* table */}
        {role === "admin" ? (
          <>
            <div className="sm:flex sm:items-center mt-5">
              <div className="sm:flex-auto">
                <h1 className="text-base font-semibold leading-6 text-gray-900">
                  List Processed Bookings
                </h1>
              </div>
            </div>
            {/* table */}
            <div className="mt-8 flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                          >
                            Name
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            ID
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Keperluan
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Jam
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Ruang
                          </th>
                          <th
                            scope="col"
                            className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                          >
                            <span className="sr-only">Status</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {listBookAll?.map((person) => (
                          <tr key={person.id}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                              {person.User.name}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {person.User.id_kampus}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {person.keperluan}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {formatDate(person.tgl_booking)},{" "}
                              {person.shift_mulai} - {person.shift_selesai}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {person.Ruang.nama_ruang}
                            </td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                              <p
                                href="#"
                                className="text-indigo-600 hover:text-indigo-900"
                              >
                                {person.status}
                              </p>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            {/* table */}
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
