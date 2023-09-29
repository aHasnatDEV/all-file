import { BsDot } from "react-icons/bs";
import TitleBadges from "./TitleBadges";
import InfoBadges from "./InfoBadges";
import formatDate from "../Utils/formatDate";

/**
 * ShowInfo Component to display flight information for departure or arrival.
 * @component
 * @param {*} param 
 * @param {string} param.infoFor - Indicates if the information is for departure or arrival.
 * @param {string} param.data - Data for departure or arrival.
 * @returns {JSX.Element} The ShowInfo component.
 */
export default function ShowInfo({ infoFor, data }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 my-4 text-center">
      {/* Title Badges */}
      <TitleBadges
        text={infoFor === 'departure' ? 'Departure' : infoFor === 'arrival' ? 'Arrival' : ''}
        style="w-fit bg-slate-200 py-2 px-4 rounded-full text-sm"
      />
      <div>
        <div className="w-fit mx-auto">
          <h3 className="text-xl font-semibold">{data?.airport}</h3>
          <div className="text-gray-500 flex items-center text-sm w-fit mx-auto mb-3">
            <p>IATA: {data?.iata}</p>
            <BsDot className="text-xl" />
            <p>ICAO: {data?.icao}</p>
          </div>
        </div>

        {/* Data Table */}
        <table className="w-full">
          <tbody className="bg-slate-300 flex flex-col gap-[2px] w-full">
            {/* Data Rows */}
            <tr className="flex gap-[2px] w-full">
              <td className="p-3 bg-slate-200 w-full">
                <h5>Scheduled</h5>
                <p className="w-full">{data?.scheduled ? formatDate(data?.scheduled) : 'No Data Available'}</p>
              </td>
              <td className="p-3 bg-slate-200 w-full">
                <h5>Estimated</h5>
                <p className="w-full">{data?.estimated ? formatDate(data?.estimated) : 'No Data Available'}</p>
              </td>
            </tr>
            <tr className="flex gap-[2px] w-full">
              <td className="p-3 bg-slate-200 w-full">
                <h5>Actual</h5>
                <p className="w-full">{data?.actual ? formatDate(data?.actual) : 'No Data Available'}</p>
              </td>
              <td className="p-3 bg-slate-200 w-full">
                <h5>Runway</h5>
                <p className="w-full">{data?.actual_runway ? formatDate(data?.actual_runway) : 'No Data Available'}</p>
              </td>
            </tr>
          </tbody>
        </table>

        {/* Display Terminal and Gate information for departures */}
        {infoFor === 'departure' ? (
          <div className="w-full my-6 flex justify-around">
            <InfoBadges title="Terminal" value={data?.terminal ? data?.terminal : '- -'} />
            <InfoBadges title="Gate" value={data?.gate ? data?.gate : '- -'} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
