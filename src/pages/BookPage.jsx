import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import Swal from "sweetalert2";
import TimeRange from "../components/TimeRange";
const baseUrl = "http://localhost:3000";

export const BookPage = () => {
  const input = {
    selectedGedung: useRef(),
    selectedRuang: useRef(),
    alasan: useRef(),
    tanggal: useRef(),
  };

  const navigate = useNavigate();

  const [gedung, setGedung] = useState([]);
  const [ruang, setRuang] = useState([]);
  const [timeValue, setTimeValue] = useState([]);
  const [listBook, setListBook] = useState([]);
  const [showList, setShowList] = useState(false);

  const handleTimeChange = (values) => {
    setTimeValue(values);
  };

  const handleGedungChange = (event) => {
    const selectedGedung = input.selectedGedung.current.value;

    const fetchRuang = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/ruang/${selectedGedung}`, {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });
        setRuang(data.ruang);
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
    fetchRuang();
  };

  const handleTanggalBookingChange = (event) => {
    const fetchBook = async () => {
      try {
        const { data } = await axios.post(
          `${baseUrl}/get-book`,
          {
            tgl_booking: input.tanggal.current.value,
            id_ruang: input.selectedRuang.current.value,
          },
          {
            headers: {
              access_token: localStorage.getItem("access_token"),
            },
          }
        );
        setListBook(data.booking);
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
    fetchBook();
    setShowList(true);
  };

  const handleBookingSubmit = async () => {
    try {
      if (
        input.selectedGedung.current.value === "" ||
        input.selectedRuang.current.value === "" ||
        input.alasan.current.value === "" ||
        input.tanggal.current.value === "" ||
        timeValue[0] === "" ||
        timeValue[1] === ""
      ) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `Tolong lengkapi semua form input!`,
        });
        return;
      }

      const { data } = await axios.post(
        `${baseUrl}/booking`,
        {
          tgl_booking: input.tanggal.current.value,
          id_ruang: input.selectedRuang.current.value,
          time: timeValue,
          alasan: input.alasan.current.value,
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
        text: `Booking Success`,
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
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
    const fetchGedung = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/gedung`, {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });

        setGedung(data.gedung);
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

    fetchGedung();
  }, []);

  return (
    <div className="container mx-auto sm:px-6 lg:px-8">
      {/* heading */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="m-3 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Booking Ruang
          </h2>
        </div>
      </div>
      {/* heading */}
      {/* menu */}
      <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2 p-10">
        <div className="grid grid-cols-2 gap-4 mb-10">
          <div>
            <div className="relative">
              <label
                htmlFor="gedung"
                className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
              >
                Gedung
              </label>
              <select
                className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                id="gedung"
                onChange={handleGedungChange}
                ref={input.selectedGedung}
              >
                <option value="0">Pilih Gedung</option>
                {/* Map over gedung options and render <option> elements */}
                {gedung &&
                  gedung.map((g, index) => <option key={index}>{g}</option>)}
              </select>
            </div>
          </div>

          <div>
            <div className="relative">
              <label
                htmlFor="ruang"
                className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
              >
                Ruang
              </label>
              <select
                className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                id="ruang"
                ref={input.selectedRuang}
              >
                {/* Render options based on the selected gedung */}
                {ruang &&
                  ruang.map((r, index) => (
                    <option key={index} value={r.id}>
                      {r.nama_ruang} - ({r.kapasitas} orang)
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-10">
          <div>
            <div className="relative">
              <label
                htmlFor="name"
                className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
              >
                Keperluan Booking
              </label>
              <input
                type="text"
                className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                id="alasan"
                placeholder="Keperluan Booking"
                ref={input.alasan}
              />
            </div>
          </div>

          <div>
            <div className="relative">
              <label
                htmlFor="name"
                className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
              >
                Tanggal Booking
              </label>
              <input
                type="date"
                className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                id="tanggalBooking"
                onChange={handleTanggalBookingChange}
                autoComplete="off"
                style={{ cursor: "pointer" }}
                placeholder="Tanggal Booking"
                ref={input.tanggal}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center mb-10">
          <div className="w-full">
            <div className="relative">
              <label
                htmlFor="name"
                className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
              >
                Waktu Booking
              </label>

              <TimeRange changeTime={handleTimeChange} />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            className="inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handleBookingSubmit}
          >
            Book
            <CheckCircleIcon className="-mr-0.5 h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* menu */}

      {showList ? (
        <>
          <div className="px-4 sm:px-6 lg:px-8 mt-3">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-base font-semibold leading-6 text-gray-900">
                  List Bookings
                </h1>
              </div>
            </div>
            {/* {listBook && JSON.stringify(listBook)} */}
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
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
