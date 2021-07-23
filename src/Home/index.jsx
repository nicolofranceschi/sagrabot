import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { getUserDocument } from "../firebase";

export default function Home() {

    const [data, setData] = useState(null);

    useEffect(async () => {
        try {
            const res = await getUserDocument("sala");
            if (!res) throw "No connection"
            setData(res?.sale['SAGRA']);
        } catch (error) {
            toast.error(error, {
                position: "top-right",
                autoClose: 2000,
                closeOnClick: true,
                draggable: true,
            });
        }
    }, [])

    if (data != null) {

        const result = Object.entries(data).reduce((acc, pixel) => {
            const [key, value] = pixel;
            const { prenotazioni } = value;

            if (!prenotazioni || prenotazioni.length === 0) return acc;

            const temp = value.prenotazioni.reduce((accPrenotazioni, prenotazione) => prenotazione.type !== 'default' && prenotazione.user === '3495141095' ? accPrenotazioni : ({
                ...accPrenotazioni,
                [`${prenotazione.data}-${prenotazione.orario}`]: { ...prenotazione, pixel: key }
            }), {});
            return {
                ...acc,
                ...Object.entries(temp).reduce((externalAcc, [id, current]) => ({
                    ...externalAcc,
                    [id]: [...(acc[id] ?? []), current]
                }), {})
            }
        }, {});
    }

    return (
        <div>
            <ToastContainer
                position="top-right"
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                pauseOnHover
                draggable
                hideProgressBar
            />
        </div>
    );


}
