import { useState } from "react";
import { MdLocalAirport } from "react-icons/md";
import ShowInfo from "./Components/ShowInfo";
import useGetInfo from "./Hook/useGetInfo";

/**
 * App Component
 * @component
 * @description The main application component for flight information.
 * @returns {JSX.Element} The App component.
 */
export default function App() {
  const [value, setValue] = useState('');
  const { apiData } = useGetInfo(value);

  const liveData = apiData?.data?.find(data => data.live !== null);

  /**
   * Handles form submission when the Enter button is pressed.
   * @param {Object} e - The event object.
   */
  function enterButtonSubmit(e) {
    e.preventDefault();
    const text = e.target.num.value;
    setValue(text);
  };

  return (
    <main className="w-full min-h-screen py-12 bg-slate-300 flex items-center justify-center">
      <div className="w-fit bg-white">

        {/* Flight number input form */}
        <form
          onSubmit={enterButtonSubmit}
          className="bg-slate-200 w-full flex flex-col items-center mx-auto py-4"
        >
          <input
            type="text"
            name="num"
            className="outline-none border bg-slate-200 text-center text-3xl"
            placeholder="Enter Flight Number"
          />
          <label className="mt-4">{liveData?.airline?.name}</label>
        </form>

        {/* Flight information display */}
        <div className="text-center flex flex-col items-center gap-4 my-4">
          <div>
            <h3 className="text-xl font-semibold">{liveData?.departure?.iata}</h3>
            <p>{liveData?.departure?.airport}</p>
          </div>
          <div>
            <MdLocalAirport className="text-3xl rotate-90" />
          </div>
          <div>
            <h3 className="text-xl font-semibold">{liveData?.arrival?.iata}</h3>
            <p>{liveData?.arrival?.airport}</p>
          </div>
        </div>

        {/* Airborne status */}
        {liveData ? (
          <div className="w-full py-3 bg-lime-500 text-white text-center">
            <h3 className="text-xl font-semibold">Airborne</h3>
            <p>On Time</p>
          </div>
        ) : null}

        {/* Departure section */}
        <ShowInfo infoFor='departure' data={liveData?.departure} />
        {/* Arrival section */}
        <ShowInfo infoFor='arrival' data={liveData?.arrival} />

      </div>
    </main>
  )
}
